import React, {useRef} from 'react';

const PostComp = () => {

    const imgRef = useRef();
    const titleRef = useRef();
    const priceRef = useRef();
    const durationRef = useRef();

    async function create() {
        console.log(imgRef.current.value)
        console.log(titleRef.current.value)
        console.log(priceRef.current.value)
        console.log(durationRef.current.value)

        const info = {
            img: imgRef.current.value,
            title: titleRef.current.value,
            price: priceRef.current.value,
            duration: durationRef.current.value
        }


        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            credentials: "include",
            body: JSON.stringify(info)
        }

        const res = await fetch("http://localhost:5000/create", options);
        const data = await res.json();

        console.log(data)
    }

    return (
        <div className="create d-flex column a-center">
            <div className="d-flex a-center space-btw">
                Picture: <input type="text" ref={imgRef} placeholder="Picture"/>
            </div>
            <div className="d-flex a-center space-btw">
                Title: <input type="text" ref={titleRef} placeholder="Title"/>
            </div>
            <div className="d-flex a-center space-btw">
                Starting price: <input type="number" ref={priceRef} placeholder="Starting price"/>
            </div>
            <div className="d-flex a-center space-btw">
                Duration: <select ref={durationRef}>
                <option value="60000">1 min</option>
                <option value="300000">5 min</option>
                <option value="600000">10 min</option>
                <option value="3600000">1 h</option>
                <option value="28800000">8 h</option>
                <option value="86400000">24 h</option>
            </select>
            </div>
            <button onClick={create}>Create</button>
        </div>
    );
};

export default PostComp;