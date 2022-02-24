import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import TimerComp from "./TimerComp";

const BidsComp = () => {

    const [getItems, setItems] = useState(null);
    const [getUsername, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(async () => {
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
    }, [])

    function goToSinglePost(id) {
        navigate("/single/" + id);
    }

    function filterMyHistory(items) {
        let myBids = [];
        let myBets = [];
        items.map(x => {
            let includes = false;
            x.bids.map(y => {
                if (y.username === getUsername) {
                    includes = true;
                    myBids.push(y);
                }
            })
            if (includes) myBets.push(x);
        })
        if (myBets.length !== 0) {
            return (
                <div>
                    {myBets.map(x  =>
                        <div className="itemPreview d-flex" key={x._id}>
                            <div onClick={() => goToSinglePost(x._id)} className="grow1 j-center a-center d-flex">
                                <img src={x.image} alt=""/>
                            </div>
                            <div className="grow2 d-flex column j-center">
                                <div>Owner: {x.owner}</div>
                                <div>Start price: {x.startPrice} $</div>
                                <div>My bid: {myBids[0].price} $</div>
                                <div>Current highest bid: {x.currentPrice}$ by {x.bids[0].username}</div>
                                <TimerComp timeStamp={x.endTime} bids={x.bids}/>
                                <div>Bids: {x.bids.length}</div>
                            </div>
                        </div>)}
                </div>
            )
        } else {
            return <div className="d-flex j-center">You have not placed any bet</div>
        }
    }

    return (
        <div>
            {getItems && filterMyHistory(getItems)}
        </div>
    );
};

export default BidsComp;