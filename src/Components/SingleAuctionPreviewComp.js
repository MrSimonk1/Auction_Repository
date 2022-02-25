import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const SingleAuctionPreviewComp = ({oneItem}) => {

    const navigate = useNavigate();

    const [getHours, setHours] = useState("00");
    const [getMinutes, setMinutes] = useState("00");
    const [getSeconds, setSeconds] = useState("00");
    const [getActive, setActive] = useState(true);
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

        if ((hours === "00" && minutes === "00" && seconds === "00")) {
            setActive(false);
        } else {
            setActive(true);
        }

        clearInterval(interval)
    }

    function goToSinglePost() {
        navigate("/single/" + oneItem._id);
    }

    return (
        <div className="itemPreview d-flex">
            <div onClick={goToSinglePost} className="grow1 j-center a-center d-flex cursor-pointer">
                <img src={oneItem.image} alt=""/>
            </div>
            <div className="grow2 d-flex column j-center">
                <div>Owner: {oneItem.owner}</div>
                <div className="mt-mb-10">
                    <div>Start price: {oneItem.startPrice} $</div>
                    <h4>Current price: {oneItem.currentPrice} $</h4>
                    <div>Bids: {oneItem.bids.length}</div>
                </div>
                <div style={getActive ? null : {color: "#949494"}}>
                    <div>Time remaining: {getHours}:{getMinutes}:{getSeconds}</div>
                    {!getActive && <div>
                        {oneItem.bids.length !== 0 ? <div>Won by: {oneItem.bids[0].username} for {oneItem.bids[0].price} $</div> : <div>Auction finished without a winner</div>}
                    </div>}
                </div>
            </div>

        </div>
    );
};

export default SingleAuctionPreviewComp;