import React from "react";
import Nav from "./Nav";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const RecipeView = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [meal, setMeal] = React.useState(null);
    const [ingredients, setIngredients] = React.useState(null);
    React.useEffect(() => {
        const fetchData = async () => {
            const r = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            setMeal(r.data.meals[0]);

            let done = false;
            let num = 1;
            const ing = [];
            while (!done) {
                if (
                    r.data.meals[0][`strIngredient${num}`] !== null &&
                    r.data.meals[0][`strIngredient${num}`].replaceAll(" ", "")
                        .length > 0
                ) {
                    ing.push(
                        `${r.data.meals[0][`strMeasure${num}`]} ${
                            r.data.meals[0][`strIngredient${num}`]
                        }`
                    );
                    num += 1;
                } else done = true;
            }
            setIngredients(ing);
        };
        fetchData();
    }, []);
    return (
        <>
            <Nav />
            {meal && ingredients ? (
                <div className="flex flex-col gap-4 mt-4 text-center items-center p-4">
                    <h1 className="text-5xl">{meal.strMeal}</h1>
                    <img
                        src={meal.strMealThumb}
                        width="500px"
                        className="rounded-xl"
                    />
                    <a
                        href={meal.strYoutube}
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
                    <p className="px-60">{meal.strInstructions}</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-12 h-12 p-2 rounded-full bg-blue-500 hover:bg-blue-200 hover:cursor-pointer transition-all ease-in-out duration-300 fixed left-2 bottom-2"
                        onClick={() => {
                            nav("/saved");
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                    </svg>
                </div>
            ) : null}
        </>
    );
};

export default RecipeView;
