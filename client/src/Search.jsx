import React from "react";
import Nav from "./Nav";
import Card from "./Card";
import axios from "axios";

const Search = () => {
    const [search, setSearch] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [results, setResults] = React.useState([]);
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (search !== "") {
                const r = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
                );
                setResults(r.data.meals);
                setLoading(false);
            } else {
                setLoading(false);
                setResults([]);
            }
        }, 1500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // Search meal by name :: www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
    return (
        <>
            <Nav />
            <div className="flex flex-col items-center gap-8 mt-4">
                <input
                    type="search"
                    className="rounded-xl bg-blue-200 w-96 h-10 text-2xl"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setLoading(true);
                        setResults([]);
                    }}
                />
                {loading ? (
                    <div className="flex animate-pulse bg-blue-400 rounded-3xl text-center">
                        <h1 className="p-4 text-white font-bold">Loading</h1>
                    </div>
                ) : null}
                <div className="flex flex-row flex-wrap justify-center gap-12">
                    {results ? (
                        <>
                            {results.map((el) => (
                                <Card
                                    key={el.idMeal}
                                    recipe={el}
                                    saved={false}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            {search.length > 0 ? (
                                <h1>Nothing found! :(</h1>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Search;
