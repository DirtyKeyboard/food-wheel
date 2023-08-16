import React from "react";
import Nav from "./Nav";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const SavedRecipes = () => {
    const nav = useNavigate();
    const [foods, setFoods] = React.useState([]);
    React.useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem("token");
                const r = await axios.get("/api/saved_recipes", {
                    headers: { authorization: token },
                });
                r.data.savedRecipes.forEach(async (el) => {
                    const r = await axios.get(
                        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el}`
                    );
                    setFoods((f) => [...f, r.data.meals[0]]);
                });
            } catch (e) {
                nav("/");
            }
        };
        getData();
    }, []);
    const removeFood = (id) => {
        const newFoods = foods.filter((el) => {
            return el.idMeal !== id;
        });
        setFoods(newFoods);
    };
    return (
        <>
            <Nav />
            <div className="flex gap-4 p-20">
                {foods.map((el) => (
                    <Card recipe={el} key={el.idMeal} removeFood={removeFood} />
                ))}
            </div>
        </>
    );
};

export default SavedRecipes;
