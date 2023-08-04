import React from "react";
import Nav from "./Nav";

const RecipeView = ({ meal }) => {
    return (
        <>
            <Nav />
            <div>{meal.strMeal}</div>
        </>
    );
};

export default RecipeView;
