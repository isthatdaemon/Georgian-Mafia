import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { assignRoles } from "../utils/assignRoles";

function makeCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function Lobby() {
  const [stage, setStage] = useState<"start" | "room">("start");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState("");

  // თუ ლობი გახსნილია და არსებობს roomCode, გავაკონტროლოთ სტატუსი
  useEffect(() => {
    if (!roomCode) return;

    const ref = doc(db, "rooms", roomCode);
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();

      if (!data) return;

      setPlayers(data.players || []);

      // თუ თამაში დაწყებულია, გადამყავს RoleScreen-ზე
      if (data.status === "started") {
        window.location.href = "/role";
      }
    });

    return () => unsub();
  }, [roomCode]);

  const handleCreate = async () => {
    if (!playerName.trim()) return setError("შეიყვანე სახელი");
    const code = makeCode();
    const ref = doc(db, "rooms", code);
    await setDoc(ref, { players: [playerName.trim()], status: "waiting" });
    setRoomCode(code);
    setStage("room");
    localStorage.setItem("playerName", playerName.trim());
    localStorage.setItem("roomCode", code);
    setError("");
  };

  const handleJoin = async () => {
    if (!playerName.trim()) return setError("შეიყვანე სახელი");
    if (roomCode.length !== 4) return setError("კოდი უნდა იყოს 4 ასო");
    const ref = doc(db, "rooms", roomCode);
    const snap = await getDoc(ref);
    if (!snap.exists()) return setError("ოთახი ვერ მოიძებნა");

    const data = snap.data();
    if (data.players.includes(playerName.trim()))
      return setError("ეს სახელი უკვე ლობიშია");

    await updateDoc(ref, { players: arrayUnion(playerName.trim()) });
    setStage("room");
    localStorage.setItem("playerName", playerName.trim());
    localStorage.setItem("roomCode", roomCode);
    setError("");
  };

  const startGame = async () => {
    if (players.length < 6) {
      return setError("თამაში იწყება მინიმუმ 6 მოთამაშით");
    }

    const ref = doc(db, "rooms", roomCode);
    const roles = assignRoles(players);

    await updateDoc(ref, {
      roles: roles,
      status: "started",
    });

    localStorage.setItem("playerName", playerName.trim());
    localStorage.setItem("roomCode", roomCode);

    window.location.href = "/role";
  };

  if (stage === "start") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl mb-6 font-bold">მაფია</h1>

        <input
          type="text"
          placeholder="შენი სახელი"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="mb-4 px-4 py-2 rounded text-black w-64"
        />

        <div className="flex space-x-4">
          <button
            onClick={handleCreate}
            className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
          >
            ახალი ლობი
          </button>
          <input
            type="text"
            placeholder="ლობის კოდი"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            maxLength={4}
            className="px-4 py-2 rounded text-black w-24"
          />
          <button
            onClick={handleJoin}
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
          >
            შემოუერთდი
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    );
  }

  // stage === "room"
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h2 className="text-3xl mb-2">ლობის კოდი: {roomCode}</h2>
      <h3 className="text-xl mb-4">მოთამაშეები:</h3>
      <ul className="mb-6 space-y-1">
        {players.map((p) => (
          <li key={p} className="text-lg">
            {p}
          </li>
        ))}
      </ul>

      {players[0] === playerName && (
        <button
          onClick={startGame}
          className="bg-green-600 px-6 py-3 rounded hover:bg-green-700"
        >
          თამაშის დაწყება
        </button>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
