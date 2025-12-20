import { useEffect } from "react";
import { useState } from "react"


function AdCard(){

    return <>


    
    </>
}

export default function BuyAd(){

    const [ads, setAds] = useState([]);

    let token = localStorage.getItem("token");

    console.log(`token : ${token}`);
    if(!token || token == "null" || token == "undefined"){
        console.log("Token is not found");
    }

    useEffect(() => {
        async function fetchPosts() {
            try {
            const res = await fetch("http://localhost:8080/buy/allPosts", {
                method: "GET",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                "token": token
                }
            });

            const data = await res.json();
            console.log(data);
            } catch (err) {
            console.error(err);
            }
        }

        fetchPosts();
    }, []);



    return <>
    
        <div className="h-screen overflow-y-scroll snap-y snap-madatory">


        </div>
    </>
}