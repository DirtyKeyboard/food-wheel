import React from "react";
import Nav from "./Nav";
import Wheel from "./Wheel";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Generator = () => {
    //call axios.get('/api/saved_recipes', {headers: {authorization: token}}), if view.strMealId is in saved recipes, dont show save recipe button, take to recipe view
    const token = localStorage.getItem("token");
    const [view, setView] = React.useState(null);
    const [ingredients, setIngredients] = React.useState([]);
    const nav = useNavigate();
    React.useEffect(() => {
        const check = async () => {
            try {
                await axios.get("/api/check", {
                    headers: { authorization: token },
                });
            } catch (err) {
                nav("/");
            }
        };
        check();
    }, []);
    const saveRecipe = async () => {
        const r = await axios.post(
            "/api/save_recipe",
            { idMeal: view.idMeal },
            { headers: { authorization: token } }
        );
        console.log(r);
    };
    return (
        <>
            <Nav />
            {view ? (
                <div className="flex flex-col gap-4 mt-4 text-center items-center p-4">
                    <h1 className="text-5xl">{view.strMeal}</h1>
                    <img
                        src={view.strMealThumb}
                        width="500px"
                        className="rounded-xl"
                    />
                    <a
                        href={view.strYoutube}
                        className="text-blue-500 underline"
                    >
                        See Video
                    </a>
                    <h1 className="text-2xl">Ingredients</h1>
                    <ul>
                        {ingredients.map((el) => (
                            <li key={ingredients.indexOf(el)}>• {el}</li>
                        ))}
                    </ul>
                    <h1 className="text-2xl">Instructions</h1>
                    <p className="px-60">{view.strInstructions}</p>
                    <div className="flex gap-4">
                        <button className="btn" onClick={saveRecipe}>
                            Save Recipe
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Reroll
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-4 gap-4">
                    <h1 className="text-4xl">Spin the wheel!</h1>
                    <Wheel
                        setView={setView}
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                    />
                </div>
            )}
        </>
    );
};

export default Generator;
