import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import RandomGame from "./pages/RandomGame";
import RoleScreen from "./pages/RoleScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lobby" element={<Lobby />} />   {/* მხოლოდ ერთი გვერდი */}
      <Route path="/random" element={<RandomGame />} />
      <Route path="/role" element={<RoleScreen />} />
    </Routes>
  );
}
