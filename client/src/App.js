import "./App.css";
import Home from "./components/Home";
import Login from "./components/Users/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Users/Register";
import Basic from "./components/Basic";
import Admin from "./components/Admin/Admin";
import { Problems } from "./components/Problems";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
