import React, {useRef} from 'react';

const RegisterComp = () => {

    const usernameRef = useRef();
    const passOneRef = useRef();
    const passTwoRef = useRef();

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
    }

    return (
        <div className="regOrLogDiv d-flex column a-center">
            <input type="text" ref={usernameRef} placeholder="Username"/>
            <input type="text" ref={passOneRef} placeholder="Password One"/>
            <input type="text" ref={passTwoRef} placeholder="Password Two"/>
            <button className="regBtn" onClick={register}>Register</button>
        </div>
    );
};

export default RegisterComp;