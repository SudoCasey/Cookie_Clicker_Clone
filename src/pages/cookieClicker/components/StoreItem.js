import React, { useState, useEffect } from "react";
import styles from '@/styles/StoreItem.module.scss'


function StoreItem(props){
    let itemCost = props.itemCost;
    let itemName = props.itemName;
    let itemsOwned = props.itemsOwned;
    let attemptBuy = props.attemptBuy;
    let attemptSell = props.attemptSell;
    

    return (
      <div className={`${styles.storeItem}`}>
        <p>Cost: {`${itemCost*(itemsOwned+1)}`}</p>
        <p>Owned: {`${itemsOwned}`}</p>
        <button onClick={attemptBuy}>{`Buy ${itemName}`}</button>
        <button onClick={attemptSell}>{`Sell ${itemName}`}</button>
      </div>
    );
}

export default StoreItem;