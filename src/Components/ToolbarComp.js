import React from 'react';
import {useNavigate} from "react-router-dom";
import {MyContext} from "../contexts/MyContext";
import {useContext} from "react";

const ToolbarComp = () => {

    const navigate = useNavigate();
    const {getUser} = useContext(MyContext);
    const {setUser} = useContext(MyContext);

    function notLoggedIn() {
        return (
            <div className="toolbar d-flex">
                <div onClick={() => navigate("/")}>Register</div>
                <div onClick={() => navigate("/login")}>Login</div>
            </div>
        )
    }

    async function logout() {
        const options = {
            method: "GET",
            headers: {
                "content-type" : "application/json"
            },
            credentials: "include"
        }
        const res = await fetch("http://localhost:5000/logout", options);
        const data = await res.json();

        console.log(data);
        if (data.success) {
            setUser(null);
            navigate("/")
        }
    }

    function loggedIn() {
        return (
            <div className="d-flex">
                <div className="toolbar d-flex grow1">
                    <div>{getUser.username}</div>
                    <div>{getUser.money}$</div>
                </div>
                <div className="toolbar d-flex grow5">
                    <div onClick={() => navigate("/history")}>My auctions</div>
                    <div onClick={() => navigate("/my-bids")}>Auctions with my bids</div>
                    <div onClick={() => navigate("/create")}>Post to auction</div>
                    <div onClick={() => navigate("/all")}>All auctions</div>
                    <div onClick={() => logout()}>Logout</div>
                </div>


            </div>
        )
    }

    return (
        <div>
            {getUser ? loggedIn() : notLoggedIn()}
        </div>
    );
};

export default ToolbarComp;