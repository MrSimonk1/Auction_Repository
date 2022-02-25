import React, {useState} from 'react';

const TimerComp = ({timeStamp, bids}) => {

    const [getHours, setHours] = useState(null);
    const [getMinutes, setMinutes] = useState(null);
    const [getSeconds, setSeconds] = useState(null);
    const [getActive, setActive] = useState(true);
    const endTime = timeStamp - Date.now();

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

    return (
        <div style={getActive ? null : {color: "#949494"}}>
            Time remaining: {getHours}:{getMinutes}:{getSeconds}
            {!getActive && <div>
                {bids.length !== 0 ? <div>Won by: {bids[0].username} for {bids[0].price} $</div> : <div>Auction finished without a winner</div>}
            </div>}
        </div>
    );
};

export default TimerComp;