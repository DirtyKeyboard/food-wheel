import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Home from "./Home";
import Generator from "./Generator";
import RecipeView from "./RecipeView";

function App() {
    return (
        <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/generate" element={<Generator />} />
        </Routes>
    );
}

export default App;
