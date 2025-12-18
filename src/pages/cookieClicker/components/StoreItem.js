import React, { useState, useEffect } from "react";
import styles from '@/styles/StoreItem.module.scss';
import Image from 'next/image';


function StoreItem(props){
    let itemCost = props.itemCost;
    let itemName = props.itemName;
    let itemIcon = props.itemIcon;
    let itemsOwned = props.itemsOwned;
    let attemptBuy = props.attemptBuy;
    let attemptSell = props.attemptSell;
    

    return (
      <div className={`${styles.storeItem}`}>
        <div className={`${styles.storeIcon}`}>
          <Image src={itemIcon} width="100" height="100" alt={itemName}/>
        </div>
        <div className={`${styles.storeOptions}`}>
          <p>Cost: {`${itemCost*(itemsOwned+1)}`}</p>
          <p>Owned: {`${itemsOwned}`}</p>
          <button onClick={attemptBuy}>{`Buy ${itemName}`}</button>
          <button onClick={attemptSell}>{`Sell ${itemName}`}</button>
        </div>
      </div>
    );
}

export default StoreItem;