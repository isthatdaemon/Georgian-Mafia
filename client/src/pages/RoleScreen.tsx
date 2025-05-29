import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function RoleScreen() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roomCode = localStorage.getItem("roomCode");
    const playerName = localStorage.getItem("playerName");

    if (!roomCode || !playerName) return;

    const fetchRole = async () => {
      const ref = doc(db, "rooms", roomCode);
      const snap = await getDoc(ref);
      const data = snap.data();
      const roles = data?.roles || {};
      setRole(roles[playerName] || "უცნობი");
      setLoading(false);
    };

    fetchRole();
  }, []);

  if (loading) return <div className="text-white p-4">იტვირთება...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">🎭 შენი როლია:</h1>
      <div className="text-5xl font-bold bg-gray-800 px-6 py-4 rounded shadow">
        {role}
      </div>
    </div>
  );
}
