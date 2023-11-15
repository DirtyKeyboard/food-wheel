import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="flex h-14 bg-blue-500">
            <NavLink
                to="/generate"
                className="text-white font-bold text-xl hover:bg-blue-400 p-4 transition-all ease-in-out duration-300"
            >
                Generate Food
            </NavLink>
            <NavLink
                to="/saved"
                className="text-white font-bold text-xl hover:bg-blue-400 p-4 transition-all ease-in-out duration-300"
            >
                Saved Foods
            </NavLink>
            <NavLink
                to="/search"
                className="text-white font-bold text-xl hover:bg-blue-400 p-4 transition-all ease-in-out duration-300"
            >
                Search Foods
            </NavLink>
        </nav>
    );
};

export default Nav;
