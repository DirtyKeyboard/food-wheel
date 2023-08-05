import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Home from "./Home";
import Generator from "./Generator";
import RecipeView from "./RecipeView";
import SavedRecipes from "./SavedRecipes";

function App() {
    return (
        <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/generate" element={<Generator />} />
            <Route exact path="/saved" element={<SavedRecipes />} />
            <Route path="/saved/:id" element={<RecipeView />} />
        </Routes>
    );
}

export default App;
