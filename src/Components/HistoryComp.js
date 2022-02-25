import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import TimerComp from "./TimerComp";

const HistoryComp = () => {

    const [getItems, setItems] = useState(null);
    const [getUsername, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        async function fetchData() {
            const options = {
                method: "GET",
                headers: {
                    "content-type" : "application/json"
                },
                credentials: "include"
            }
            const res = await fetch("http://localhost:5000/get-all", options);
            const data = await res.json();

            console.log(data)
            if (data.success) {
                setItems(data.allPosts)
                setUsername(data.username);
            }
        }
        fetchData();
    }, [])

    function highestBidder(bids) {
        if (bids.length !== 0) {
            return (
                <div>Current highest bidder: {bids[0].username}</div>
            )
        }
    }

    function goToSinglePost(id) {
        navigate("/single/" + id);
    }


    function filterMyHistory(items) {
       let myHistory = [];
       items.forEach(x => {
           if (x.owner === getUsername) {
               myHistory.push(x)
           }
       })
        if (myHistory.length !== 0) {
            return (
                <div>
                    {myHistory.map(x =>
                        <div onClick={() => goToSinglePost(x._id)} key={x._id} className="itemPreview d-flex">
                            <div className="grow1 j-center a-center d-flex">
                                <img src={x.image} alt=""/>
                            </div>
                            <div className="grow2 d-flex column j-center">
                                <div>Owner: {x.owner}</div>
                                <div className="mt-mb-10">
                                    <div>Start price: {x.startPrice} $</div>
                                    <div className="d-flex">Current price: {x.currentPrice} $</div>
                                    <div>{highestBidder(x.bids)}</div>
                                    <div>Bids: {x.bids.length}</div>
                                </div>
                                <TimerComp timeStamp={x.endTime} bids={x.bids}/>
                            </div>
                        </div>)}
                </div>
            )
        } else {
            return <div className="d-flex j-center">You have not created any auctions</div>
        }
    }

    return (
        <div>
            {getItems && filterMyHistory(getItems)}
        </div>
    );
};

export default HistoryComp;