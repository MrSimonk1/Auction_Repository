import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const SingleAuctionPreviewComp = ({oneItem}) => {

    const navigate = useNavigate();

    const [getHours, setHours] = useState("00");
    const [getMinutes, setMinutes] = useState("00");
    const [getSeconds, setSeconds] = useState("00");
    const endTime = oneItem.endTime - Date.now();
    console.log(endTime);

    const interval = setInterval(timer, 1000)

    function timer() {
        let hours = "00";
        if (Math.floor(endTime/1000/60/60) >= 10) {
            hours = String(Math.floor(endTime/1000/60/60))
        } else if (Math.floor(endTime/1000/60/60) >= 0 && Math.floor(endTime/1000/60/60) < 10) {
            hours = "0" + String(Math.floor(endTime/1000/60/60)).toString();
        }
        let minutes = "00";
        if (Math.floor(endTime/1000/60 - hours*60) >= 10) {
            minutes = Math.floor(endTime/1000/60 - hours*60);
        } else if (Math.floor(endTime/1000/60 - hours*60) >= 0 && Math.floor(endTime/1000/60 - hours*60) < 10) {
            minutes = "0" + Math.floor(endTime/1000/60 - hours*60).toString();
        }
        let seconds = "00";
        if (Math.floor(endTime/1000 - hours*60*60 - minutes*60) >= 10) {
            seconds = Math.floor(endTime/1000 - hours*60*60 - minutes*60);
        } else if (Math.floor(endTime/1000 - hours*60*60 - minutes*60) >= 0 && Math.floor(endTime/1000 - hours*60*60 - minutes*60) < 10) {
            seconds = "0" + Math.floor(endTime/1000 - hours*60*60 - minutes*60).toString();
        }
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);

        clearInterval(interval)
    }



    function goToSinglePost() {
        navigate("/single/" + oneItem._id);
    }

    return (
        <div onClick={goToSinglePost} className="itemPreview d-flex">
            <div className="grow1 j-center a-center d-flex">
                <img src={oneItem.image} alt=""/>
            </div>
            <div className="grow2 d-flex column j-center">
                <div>Owner: {oneItem.owner}</div>
                <div>Start price: {oneItem.startPrice}</div>
                <div>Current price: {oneItem.currentPrice}</div>
                <div>Time remaining: {getHours}:{getMinutes}:{getSeconds}</div>
                <div>Bids: {oneItem.bids.length}</div>
            </div>

        </div>
    );
};

export default SingleAuctionPreviewComp;