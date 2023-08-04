import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
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
    return (
        <>
            <Nav />
            <div>
                Welcome home, {username}
                <button
                    className="bg-blue-100 p-4 rounded-xl"
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        nav("/");
                    }}
                >
                    Logout
                </button>
            </div>
        </>
    );
};

export default Home;
