import React, {useState} from 'react';
import {useRef} from "react";
import {MyContext} from "../contexts/MyContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";


const LoginComp = () => {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const [getMessage, setMessage] = useState("");
    const {setUser} = useContext(MyContext);
    const navigate = useNavigate();

    async function login() {
        if (usernameRef.current.value.length === 0 || passwordRef.current.value.length === 0) {
            setMessage("Please fill both inputs")
        } else {
            const user = {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            }
            const options = {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                credentials: "include",
                body: JSON.stringify(user)
            }
            const res = await fetch("http://localhost:5000/login", options);
            const data = await res.json();

            console.log(data);
            if (data.success) {
                setMessage("");
                setUser(data.findUser);
                navigate("/create")
            }
            if (!data.success) {
                setMessage(data.message);
            }
        }
    }

    return (
        <div>
            <div className="regOrLogDiv d-flex column a-center">
                <input type="text" ref={usernameRef} placeholder="Username"/>
                <input type="password" ref={passwordRef} placeholder="Password One"/>
                <button className="regBtn" onClick={login}>Login</button>
            </div>
            <div className="d-flex j-center mt-30">{getMessage}</div>
        </div>
    );
};

export default LoginComp;