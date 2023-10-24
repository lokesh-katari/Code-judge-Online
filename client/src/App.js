import "./App.css";
import Home from "./components/Home";
import Login from "./components/Users/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Users/Register";
import UserProfile from "./components/Users/UserProfile";

import { Problems } from "./components/Problems";
import Main from "./components/Main";
import CodeEditor from "./components/CodeEditor";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/code" element={<Home />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/onlineCompiler" element={<CodeEditor />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
