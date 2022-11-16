import React, { useState } from "react";
import TipSlider from "./TipSlider";
import "rc-slider/assets/index.css";

const Home = () => {
  const [price, setPrice] = useState([1, 1000]);

  return (
    <div style={{margin: "100px"}}>
      <TipSlider
        marks={{
          1: `$1`,
          1000: `$1000`,
        }}
        min={1}
        range={true}
        count={1}
        // dots={true}
        // step={100}
        max={1000}
        defaultValue={[1, 1000]}
        tipFormatter={(value) => `$${value}`}
        tipProps={{
          placement: "top",
          visible: true
        }}
        value={price}
        onChange={(price) => setPrice(price)}
        onAfterChange={() => console.log("onAfterChange")}
        onBeforeChange={() => console.log("onBeforeChange")}
        allowCross={false}
      />
    </div>
  );
};

export default Home;


/**
 * We can also check, if user has moved the slider or not.
 * We user has moved but dropped it to previous value
 * 
 * Approach :- Use onBeforeChange, onChange, onAfterChange function
 *             And make states to keep track the of value of slider in these events.
*/