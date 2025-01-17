import React, { useState, useEffect } from "react";
import styles from '@/styles/cookieClicker.module.css'
import Store from './components/Store.js';


export default function CookieClicker() {
  let [cookies, setCookies] = useState(0);
  let [browserCookie, setBrowserCookie] = useState({});
  let [clickValue, setClickValue] = useState(1);
  let [timeProgressing, setTimeProgressing] = useState(true);
  let [cpsFromStoreItems, setCPSFromStoreItems] = useState(0);
  const browserCookieName = "cookieCount";

  function findBrowserCookie(cookieName) {
    if (typeof document !== "undefined") {
      const cookiesArray = document.cookie
        .split(";")
        .map((cookie) => cookie.trim().split("="));
      const cookie = cookiesArray.find(([name]) => name === cookieName);
      if (cookie) {
        const [name, value] = cookie;
        return {
          name: name,
          value: value,
        };
      }
    }
    return false;
  }

  useEffect(() => {
    //No Dependencies
    const foundCookie = findBrowserCookie(browserCookieName);
    //console.log("foundCookie: ",foundCookie);
    //console.log("browserCookie: ",browserCookie);
    /*if (foundCookie && foundCookie.value > cookies) {
      console.log("resuming play...");
      setCookies(foundCookie.value);
    } else*/ if (
      !foundCookie ||
      !foundCookie.value ||
      foundCookie.value == undefined ||
      foundCookie.value == "undefined"
    ) {
      setBrowserCookie(saveBrowserCookie(0));
    }
    if (Object.keys(browserCookie).length === 0) {
      setBrowserCookie(foundCookie);
    }
  });

  useEffect(() => {
    let interval;
    var speedOfTime = 100; // ms

    if (timeProgressing) {
      interval = setInterval(()=>{
        setCookies(
          parseInt(cookies) + passiveCookieGain(speedOfTime, cpsFromStoreItems)
        );
      },speedOfTime);
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeProgressing, cookies]);

  function click(currentClickValue) {
    setCookies(parseInt(cookies) + currentClickValue);
  }

  //TODO
  // Add ability to save owned storeItems
  function saveBrowserCookie(Cookies) {
    if (Cookies) {
      let cookieString = `${browserCookieName}=${Cookies}; Secure; Path=/; SameSite=Strict; Max-Age=31536000`;
      document.cookie = cookieString;
      return cookieString;
    } else {
      let cookieString = `${browserCookieName}=${
        browserCookie.value === "undefined" ? 0 : browserCookie.value
      }; Secure; Path=/; SameSite=Strict; Max-Age=31536000`;
      document.cookie = cookieString;
      return cookieString;
    }
  }

  function updateClickValue(event) {
    console.log("updateClickValue: ", event.target.value);
    setClickValue(parseInt(event.target.value));
  }

  function toggleTimeProgressing(timeProgressing) {
    setTimeProgressing(!timeProgressing);
  }

  function passiveCookieGain(speedOfTime, cpsFromStoreItems) {
    //console.log("cpsFromStoreItems: ", cpsFromStoreItems);
    const cookiesPerSecond = 0;
    const cookiesPerMillisecond = (cookiesPerSecond + cpsFromStoreItems) / 1000;
    const cookiesGained = cookiesPerMillisecond * speedOfTime;
  
    return Math.round(cookiesGained);
  }

  return (
      <>
          <div className={`${styles.gameContent}`}>
              <section id="clickerSection" className={`${styles.mainSection}`}>
                  <img
                      className={`${styles.cookieImg}`}
                      onClick={() => click(clickValue)}
                      src="cookie.png"
                      alt="Click"
                  />
                  <div>
                      <label htmlFor="clickValue">Click Value</label>
                      <input
                          id="clickValue"
                          type="number"
                          value={clickValue}
                          onChange={(event) => updateClickValue(event)}
                      />
                  </div>
                  <button
                      onClick={() => toggleTimeProgressing(timeProgressing)}
                  >
                      {timeProgressing ? "Pause" : "Start"} Time
                  </button>
                  <button onClick={() => saveBrowserCookie(cookies)}>
                      Save Browser Cookie
                  </button>
                  <button
                      onClick={() =>
                          setBrowserCookie(findBrowserCookie(browserCookieName))
                      }
                  >
                      Find Browser Cookie
                  </button>
                  <p>Cookies: {cookies}</p>
                  <p>
                      Browser Cookie{" "}
                      {browserCookie &&
                      browserCookie.name &&
                      browserCookie.name === browserCookieName
                          ? "Exists"
                          : "Doesn't Exist"}
                  </p>
                  <p>Time is {timeProgressing ? "Progressing" : "Paused"}</p>
              </section>
              <Store
                  cookies={cookies}
                  changeCookies={(value) => {
                      setCookies(cookies + value);
                  }}
                  updateCPSFromStore={(value) => {
                    setCPSFromStoreItems(value);
                  }}
              ></Store>
          </div>
      </>
  );
}
