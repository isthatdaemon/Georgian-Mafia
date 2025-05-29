interface Props { players: string[] }
export default function PlayerList({ players }: Props) {
  return (
    <ul className="w-full max-w-md mt-4 space-y-2">
      {players.map((p, i) => (
        <li
          key={i}
          className="bg-gray-800 px-4 py-2 rounded shadow text-center"
        >
          {p}
        </li>
      ))}
    </ul>
  );
}
