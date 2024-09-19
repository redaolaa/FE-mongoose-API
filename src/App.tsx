import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MoviesList from "./components/MovieList";
import ShowMovie from "./components/ShowMovie";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateMovie from "./components/CreateMovie";

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />

        <Route path="/movies" element={<MoviesList />} />
        <Route path="/create" element={<CreateMovie />} />
        <Route path="/movie/:movieId" element={<ShowMovie user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;