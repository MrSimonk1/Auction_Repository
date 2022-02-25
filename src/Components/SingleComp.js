import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../contexts/MyContext";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const SingleComp = () => {

    const {id} = useParams();
    const [getOne, setOne] = useState(null);
    const bidRef = useRef();
    const {setUser} = useContext(MyContext);

    const [getHours, setHours] = useState(null);
    const [getMinutes, setMinutes] = useState(null);
    const [getSeconds, setSeconds] = useState(null);
    const [getActive, setActive] = useState(true);

    if (getOne) {
        const endTime = getOne.endTime - Date.now();
        console.log(endTime);

        const interval = setInterval(timer, 1000);


        let hours = "00";
        let minutes = "00";
        let seconds = "00";

        function timer() {
            if (Math.floor(endTime/1000/60/60) >= 10) {
                hours = Math.floor(endTime/1000/60/60)
            } else if (Math.floor(endTime/1000/60/60) >= 0 && Math.floor(endTime/1000/60/60) < 10) {
                hours = "0" + String(Math.floor(endTime/1000/60/60)).toString();
            }

            if (Math.floor(endTime/1000/60 - hours*60) >= 10) {
                minutes = Math.floor(endTime/1000/60 - hours*60);
            } else if (Math.floor(endTime/1000/60 - hours*60) >= 0 && Math.floor(endTime/1000/60 - hours*60) < 10) {
                minutes = "0" + Math.floor(endTime/1000/60 - hours*60).toString();
            }

            if (Math.floor(endTime/1000 - hours*60*60 - minutes*60) >= 10) {
                seconds = Math.floor(endTime/1000 - hours*60*60 - minutes*60);
            } else if (Math.floor(endTime/1000 - hours*60*60 - minutes*60) >= 0 && Math.floor(endTime/1000 - hours*60*60 - minutes*60) < 10) {
                seconds = "0" + Math.floor(endTime/1000 - hours*60*60 - minutes*60).toString();
            }
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);

            if ((hours === "00" && minutes === "00" && seconds === "00")) {
                setActive(false);
            } else {
                setActive(true);
            }
            clearInterval(interval)
        }
    }

    function bidBtn() {
            return (
                <div>
                    <input ref={bidRef} type="number"/>
                    <button onClick={makeBid}>Make bid</button>
                </div>
            )
    }

    useEffect( () => {
        async function fetchData() {
            const options = {
                method: "GET",
                headers: {
                    "content-type" : "application/json"
                },
                credentials: "include"
            }
            const res = await fetch("http://localhost:5000/single/" + id, options)
            const data = await res.json();

            console.log(data);
            if (data.success) {
                setOne(data.post);
            }
        }
        fetchData();
    }, [])

    function displayDate(timeStamp) {
        return new Date(timeStamp).toLocaleDateString("lt-LT") + " " + new Date(timeStamp).toLocaleTimeString("lt-LT")
    }

    function highestBidder() {
        if (getOne.bids.length !== 0) {
            return (
                <div>{getOne.bids[0].username}</div>
            )
        } else {
            return (
                <div>None</div>
            )
        }
    }

    function bidHistory() {
        if (getOne.bids.length === 0) {
            return (
                <div className="d-flex j-center">This auction has no bids</div>
            )
        } else {
            return (
                <div>
                    {getOne.bids.map((x, i) => <div key={i} className="d-flex">
                        <div className="grow1 d-flex j-center a-center">Username: {x.username}</div>
                        <div className="grow1 d-flex j-center a-center">Amount: {x.price}$</div>
                        <div className="grow1 d-flex j-center a-center">Time: {displayDate(x.time)}</div>
                    </div>)}
                </div>
            )
        }
    }

    async function makeBid() {
        if (bidRef.current.value) {
            const info = {
                id,
                bid: bidRef.current.value
            }
            const options = {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                credentials: "include",
                body: JSON.stringify(info)
            }
            const res = await fetch("http://localhost:5000/bid", options)
            const data = await res.json();

            console.log(data);
            if (data.success) {
                setOne(data.item);
                setUser(data.bidder);
            }

            socket.emit("getPost", id);
            socket.on("setPost", item => {
                setOne(item);
            })
        }
    }

    return (
        <div>
            {getOne && <div className="itemPreview d-flex">
                <div className="grow1 j-center a-center d-flex">
                    <img src={getOne.image} alt=""/>
                </div>
                <div className="grow2 d-flex column j-center">
                    <div>Owner: {getOne.owner}</div>
                    <div className="mt-mb-10">
                        <div>Start price: {getOne.startPrice} $</div>
                        <div>Current bid: {getOne.currentPrice} $</div>
                        <div className="d-flex">Current highest bidder: {getOne ? highestBidder() : "None"}</div>
                        <div>Bids: {getOne.bids.length}</div>
                    </div>
                    <div style={getActive ? null : {color: "#949494"}}>
                        <div>Time remaining: {getHours}:{getMinutes}:{getSeconds}</div>
                        {!getActive && <div>
                            {getOne.bids.length !== 0 ? <div>Won by {getOne.bids[0].username} for {getOne.bids[0].price} $</div> : <div>This auction finished without a winner</div>}
                        </div>}
                    </div>
                    {getActive && bidBtn()}
                </div>
            </div>}
            {getOne && bidHistory()}
        </div>
    );
};

export default SingleComp;