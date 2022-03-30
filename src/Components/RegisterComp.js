import React, {useRef, useState} from 'react';

const RegisterComp = () => {

    const usernameRef = useRef();
    const passOneRef = useRef();
    const passTwoRef = useRef();
    const [getMsg, setMsg] = useState("");

    async function register() {
        const username = usernameRef.current.value;
        const passOne = passOneRef.current.value;
        const passTwo = passTwoRef.current.value;

        const userInfo = {
            username,
            passOne,
            passTwo
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            credentials: "include",
            body: JSON.stringify(userInfo)
        }

        const res = await fetch(`http://localhost:5000/register`, options);
        const data = await res.json();

        console.log(data)
        if (data.success) {
            setMsg("Registered succesfully");
            setTimeout(() => {
                setMsg("")
            }, 3000);
        }
        if (!data.success) setMsg(data.message)
    }

    return (
        <div className="regOrLogDiv d-flex column a-center">
            <input type="text" ref={usernameRef} placeholder="Username"/>
            <input type="password" ref={passOneRef} placeholder="Password One"/>
            <input type="password" ref={passTwoRef} placeholder="Password Two"/>
            <button className="regBtn" onClick={register}>Register</button>
            <div className="d-flex j-center mt-30">{getMsg}</div>
        </div>
    );
};

export default RegisterComp;