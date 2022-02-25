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
            {getItems && getItems.map((x, i) => <SingleAuctionPreviewComp key={i} oneItem={x}/>)}
        </div>
    );
};

export default AllPage;