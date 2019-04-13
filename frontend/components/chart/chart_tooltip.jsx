import React from 'react';
import {formatMoney} from "../../utils/utils";

export default ({active, payload, value, prev, coordinate}) => {
  let stockValue;
  if(active && payload && payload[0]){
    stockValue = payload[0].value;
  } else {
    stockValue = value;
  }
  const diff = (stockValue - prev).toFixed(2);
  let percent = prev ? 0 : ((diff / prev) * 100).toFixed(2); 
  return (
    <div>
      <h1>{formatMoney(stockValue)}</h1>
      <div id="chart-percents">
        {`${diff > 0 ? "+" : ""}${diff} (${percent}%)`}
      </div>
      <div 
        id="chart-time" 
        style={{left: coordinate.x - 32}}>
          <span>
            {`${payload && payload[0] ? payload[0].payload.label : ""}`}
          </span>
        </div>
    </div>
  )  
}