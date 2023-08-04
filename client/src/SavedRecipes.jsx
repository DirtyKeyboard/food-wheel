import React from "react";
import Nav from "./Nav";
import axios from "axios";

const SavedRecipes = () => {
    const [foods, setFoods] = React.useState([]);
    React.useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token");
            const r = await axios.get("/api/saved_recipes", {
                headers: { authorization: token },
            });
            setFoods(r.data.savedRecipes);
        };
        getData();
    }, []);
    return (
        <>
            <Nav />
            <div>Saved</div>
        </>
    );
};

export default SavedRecipes;
