import React, { useState, useEffect } from "react";
import StoreItem from "./StoreItem.js";
import styles from "@/styles/Store.module.scss";

function Store(props) {
    let cookies = props.cookies;
    let changeCookies = props.changeCookies;
    let updateCPSFromStore = props.updateCPSFromStore;
    let [bakersOwned, setBakersOwned] = useState(0);
    const bakerBaseCost = 100;
    const bakerCPS = 10;
    let [restaurantsOwned, setRestaurantsOwned] = useState(0);
    const restaurantBaseCost = 1000;
    const restaurantCPS = 100;

    useEffect(()=>{
        const totalBakersCPS = bakersOwned * bakerCPS;
        const totalRestaurantCPS = restaurantsOwned * restaurantCPS;
        const totalCPS = totalBakersCPS + totalRestaurantCPS;
        updateCPSFromStore(totalCPS);
    }, [bakersOwned, restaurantsOwned]);

    function attemptBuy(itemName, itemCost, itemsOwned, cookies){
        const currentCost = itemCost*(itemsOwned+1);
        if(cookies>=currentCost){
            /*console.log("Buying: ",itemName);
            console.log("Cookies: ",cookies);
            console.log("Item Cost: ",itemCost*itemsOwned);
            console.log("Items Currently Owned: ",itemsOwned);*/
            buyItem(itemName, itemsOwned, currentCost);

        } else {
            console.warn("Not enough cookies");
        }
    }

    function buyItem(itemName, itemsOwned, currentCost){
        switch(itemName){
            case "Baker":
                setBakersOwned(itemsOwned+1);
                changeCookies(0-currentCost);
                break;
            case "Restaurant":
                setRestaurantsOwned(itemsOwned+1);
                changeCookies(0-currentCost);
                break;
            default:
                console.warn("unknown item: ", itemName);
                break;
        }
    }

    function attemptSell(itemName, itemCost, itemsOwned, cookies){
        if(itemsOwned>=1){
            const currentCost = itemCost*itemsOwned;
            sellItem(itemName, itemsOwned, currentCost);
        } else {
            console.warn(`No ${itemName}s owned`);
        }
    }



    function sellItem(itemName, itemsOwned, currentCost){
        const refund = currentCost/2;
        switch(itemName){
            case "Baker":
                setBakersOwned(itemsOwned-1);
                changeCookies(refund);
                break;
            case "Restaurant":
                setRestaurantsOwned(itemsOwned-1);
                changeCookies(refund);
                break;
            default:
                console.warn("unknown item: ", itemName);
                break;
        }
    }

    //TODO
    // StoreItem props should probably be objects (baker obj, restaurant obj, etc)
    return (
        <section
            id="storeSection"
            className={`${styles.storeSection}`}
        >
            <h2>Store</h2>
            <StoreItem
                itemName={"Baker"}
                itemCost={bakerBaseCost}
                itemsOwned={bakersOwned}
                attemptBuy={()=>{attemptBuy("Baker", bakerBaseCost, bakersOwned, cookies)}}
                attemptSell={()=>{attemptSell("Baker", bakerBaseCost, bakersOwned, cookies)}}
            ></StoreItem>
            <StoreItem
                itemName={"Restaurant"}
                itemCost={restaurantBaseCost}
                itemsOwned={restaurantsOwned}
                attemptBuy={()=>{attemptBuy("Restaurant", restaurantBaseCost, restaurantsOwned, cookies)}}
                attemptSell={()=>{attemptSell("Restaurant", restaurantBaseCost, restaurantsOwned, cookies)}}
            ></StoreItem>
        </section>
    );
}

export default Store;
