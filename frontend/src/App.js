import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.scss";
import Home from "./pages/Home";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import Authentication from "./pages/Authentication";
import Sucsess from "./components/Authentication/Sucsess";
import Recipes from "./components/Recipes";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/authentication" element={<Authentication />} />
          <Route path="/authentication/signup" element={<SignUp />} />
          <Route path="/authentication/signin" element={<SignIn />} />
          <Route path="/authentication/success" element={<Sucsess />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
