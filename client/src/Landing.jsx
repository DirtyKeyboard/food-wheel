import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const nav = useNavigate();
    const [page, setPage] = React.useState("default");
    const [form, setForm] = React.useState({ username: "", password: "" });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    React.useEffect(() => {
        const check = async () => {
            if (localStorage.getItem("token")) {
                try {
                    await axios.get("/api/check", {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    });
                    nav("/home");
                } catch (e) {}
            }
        };
        check();
    });
    return (
        <>
            <ToastContainer />
            <div className="flex flex-col justify-center items-center p-4 gap-4">
                {page === "login" ? (
                    <div className="flex flex-col justify-center items-center p-4 gap-4">
                        <h1 className="text-4xl">Login</h1>
                        <input
                            type="text"
                            className="bg-blue-100 w-96"
                            placeholder="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="bg-blue-100 w-96"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button
                            className="bg-blue-200 p-4 rounded-xl"
                            onClick={async () => {
                                if (
                                    form.username.length > 2 &&
                                    form.password.length > 2
                                ) {
                                    try {
                                        const r = await axios.post(
                                            "/api/login",
                                            {
                                                username: form.username,
                                                password: form.password,
                                            }
                                        );
                                        localStorage.setItem(
                                            "username",
                                            r.data.user.username
                                        );
                                        localStorage.setItem(
                                            "token",
                                            `Bearer ${r.data.token}`
                                        );
                                        nav("/home");
                                    } catch (err) {
                                        toast.error(
                                            "Invalid username or password"
                                        );
                                    }
                                } else
                                    toast.error(
                                        "Username / Password must be at least 2 characters"
                                    );
                            }}
                        >
                            Login
                        </button>
                    </div>
                ) : null}
                {page === "create" ? (
                    <div className="flex flex-col justify-center items-center p-4 gap-4">
                        <h1 className="text-4xl">Register</h1>
                        <input
                            type="text"
                            className="bg-blue-100 w-96"
                            placeholder="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="bg-blue-100 w-96"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button
                            className="bg-blue-200 p-4 rounded-xl"
                            onClick={async () => {
                                if (
                                    form.username.length > 2 &&
                                    form.password.length > 2
                                ) {
                                    try {
                                        const r = await axios.post(
                                            "/api/register",
                                            {
                                                username: form.username,
                                                password: form.password,
                                            }
                                        );
                                        localStorage.setItem(
                                            "username",
                                            r.data.user.username
                                        );
                                        localStorage.setItem(
                                            "token",
                                            `Bearer ${r.data.token}`
                                        );
                                        nav("/home");
                                    } catch (err) {
                                        toast.error(
                                            "This username already exists."
                                        );
                                    }
                                } else
                                    toast.error(
                                        "Username / Password must be at least 2 characters"
                                    );
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                ) : null}
                {page === "default" ? (
                    <>
                        <h1 className="text-5xl">Welcome to Recipe Finder!</h1>
                        <div className="flex gap-4 p-4">
                            <button
                                className="bg-blue-200 p-4 rounded-xl"
                                onClick={() => setPage("login")}
                            >
                                Login
                            </button>
                            <button
                                className="bg-blue-200 p-4 rounded-xl"
                                onClick={() => setPage("create")}
                            >
                                Create Account
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
};

export default Landing;
