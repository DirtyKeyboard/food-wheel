import React from "react";
import WheelComponent from "react-wheel-of-prizes";
import axios from "axios";

const Wheel = ({ ingredients, setIngredients, setView }) => {
    const [segments, setSegments] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [modal, setModal] = React.useState(false);
    const [winner, setWinner] = React.useState({});
    React.useEffect(() => {
        const getData = async () => {
            const segs = [];
            const its = [];
            for (let i = 0; i < 10; i++) {
                const r = await axios.get(
                    "https://www.themealdb.com/api/json/v1/1/random.php"
                );
                segs.push(r.data.meals[0].strMeal);
                its.push(r.data.meals[0]);
            }
            setSegments(segs);
            setItems(its);
            setLoading(false);
        };
        getData();
    }, []);

    const segColors = [
        "#60a5fa",
        "#1e40af",
        "#60a5fa",
        "#1e40af",
        "#60a5fa",
        "#1e40af",
        "#60a5fa",
        "#1e40af",
        "#60a5fa",
        "#1e40af",
    ];
    const onFinished = (w) => {
        let done = false;
        let num = 1;
        const ing = [];
        while (!done) {
            if (
                items[segments.indexOf(w)][`strIngredient${num}`] !== null &&
                items[segments.indexOf(w)][`strIngredient${num}`].replaceAll(
                    " ",
                    ""
                ).length > 0
            ) {
                ing.push(
                    `${items[segments.indexOf(w)][`strMeasure${num}`]} ${
                        items[segments.indexOf(w)][`strIngredient${num}`]
                    }`
                );
                num += 1;
            } else done = true;
        }
        setIngredients(ing);
        setWinner(items[segments.indexOf(w)]);
        setModal(true);
        console.log(items[segments.indexOf(w)]);
    };
    return (
        <>
            <div
                id="modal"
                className={`${
                    modal
                        ? " w-screen h-screen bg-black bg-opacity-40 backdrop-blur-md"
                        : ""
                } fixed top-0 left-0 transition-all ease-in-out duration-500 flex justify-center items-center gap-4 flex-col`}
            >
                {modal ? (
                    <>
                        <img
                            src={winner.strMealThumb}
                            width="300px"
                            height="300px"
                            className="rounded-2xl"
                        />
                        <h1 className="text-white font-bold text-3xl">
                            {winner.strMeal}
                        </h1>
                        <h1 className="text-white font-bold text-xl">
                            Category: {winner.strCategory} - Region:{" "}
                            {winner.strArea}
                        </h1>
                        <div className="flex gap-2">
                            <button
                                className="btn"
                                onClick={() => setView(winner)}
                            >
                                Make It!
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                GROSS! Reroll!
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
            {loading ? (
                <div className="h-16 animate-pulse bg-blue-400 rounded-3xl text-center flex items-center justify-center">
                    <h1 className="p-4 text-white font-bold">Loading</h1>
                </div>
            ) : (
                <div className="w-[600px]">
                    <WheelComponent
                        segments={segments}
                        segColors={segColors}
                        onFinished={(winner) => onFinished(winner)}
                        primaryColor="black"
                        contrastColor="white"
                        buttonText="Start"
                        isOnlyOnce={true}
                        size={290}
                        upDuration={300}
                        downDuration={400}
                        fontFamily="Helvetica"
                    />
                </div>
            )}
        </>
    );
};

export default Wheel;
