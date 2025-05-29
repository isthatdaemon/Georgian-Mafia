import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">მაფიის ღამე</h1>
      <div className="space-y-4">
        <button
          onClick={() => navigate("/random")}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg"
        >
          შემთხვევით ხალხთან თამაში
        </button>
        <button
          onClick={() => navigate("/lobby")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg"
        >
          მეგობრებთან თამაში
        </button>
      </div>
    </div>
  );
};

export default Home;
