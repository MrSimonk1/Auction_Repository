import React, {useEffect, useState} from 'react';
import SingleAuctionPreviewComp from "../Components/SingleAuctionPreviewComp";

const AllPage = () => {

    const [getItems, setItems] = useState(null);

    useEffect(() => {
        async function fetchData () {
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
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            {getItems && <div className="d-flex column-rev">
                {getItems.length !== 0 ? getItems.map((x, i) => <SingleAuctionPreviewComp key={i} oneItem={x}/>)  : <div className="d-flex j-center mt-30">No auctions yet</div>}
            </div>}
        </div>
    );
};

export default AllPage;