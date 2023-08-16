import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Card = ({ recipe, removeFood }) => {
    const [modal, setModal] = React.useState(false);
    const nav = useNavigate();
    const deleteRecipe = async () => {
        const token = localStorage.getItem("token");
        const r = await axios.delete(`/api/recipe/${recipe.idMeal}`, {
            headers: { authorization: token },
        });
        removeFood(recipe.idMeal);
        setModal(false);
        toast.success("Recipe removed successfully!");
    };
    return (
        <>
            <div className="fixed">
                <ToastContainer />
            </div>
            <div
                onClick={() => {
                    nav(`/saved/${recipe.idMeal}`);
                }}
                className="flex flex-col gap-1 items-center text-center bg-blue-100 p-4 rounded-xl hover:bg-blue-200 hover:cursor-pointer hover:translate-y-1 transition-all ease-in-out duration-300"
            >
                <img
                    src={recipe.strMealThumb}
                    width={250}
                    className="rounded-xl"
                />
                <p>{recipe.strMeal}</p>
                <button
                    name={recipe.idMeal}
                    onClick={(e) => {
                        e.stopPropagation();
                        setModal({ clicked: recipe.idMeal });
                    }}
                    className="w-8 h-8 font-bold text-white bg-red-500 rounded-full hover:bg-red-700"
                >
                    X
                </button>
            </div>
            <div
                id="modal"
                className={`${
                    modal
                        ? " w-screen h-screen bg-black bg-opacity-40 backdrop-blur-md"
                        : ""
                } fixed top-0 left-0 transition-all ease-in-out duration-500 flex justify-center items-center gap-4 flex-col`}
            >
                {modal.clicked ? (
                    <>
                        <h1 className="font-bold text-white text-3xl">
                            Are you sure you want to delete this food?
                        </h1>
                        <div className="flex gap-2">
                            <button
                                className="bg-white font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-all"
                                onClick={deleteRecipe}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-white font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-all"
                                onClick={() => setModal(false)}
                            >
                                No
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
};

export default Card;
