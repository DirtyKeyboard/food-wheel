import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Home from "./Home";
import Generator from "./Generator";
import RecipeView from "./RecipeView";
import SavedRecipes from "./SavedRecipes";
import Search from "./Search";

function App() {
    return (
        <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/generate" element={<Generator />} />
            <Route exact path="/saved" element={<SavedRecipes />} />
            <Route path="/saved/:id" element={<RecipeView />} />
            <Route path="/search" element={<Search />} />
        </Routes>
    );
}

export default App;
