import React, { useState, useEffect } from "react";
import "./App.scss";
import { useDebounce } from "use-debounce";

const TarkovMarket = ({ name }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (name) {
      fetch(`https://tarkov-market.com/api/v1/items/all`, {
        headers: {
          "x-api-key": "QTnLRoCJbP25tEEd",
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, []);

  const traderItems = data.filter(
    (i) => i.traderName.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="tarkov-market-container">
      {traderItems.map((item, index) => (
        <div className="tarkov-item" key={index}>
          <img src={item.img} /> 
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState("");
  const [text] = useDebounce(value, 1000);
  // https://github.com/xnimorz/use-debounce

  return (
    <div className="App">
      <header>
        <div className="brand">
        <div className="title">Tarkov Market</div>
        <div className="desc">Flea market price monitoring and tools</div>
        </div>
        </header>

      <div className="page-content">
        <h1>Flea market</h1>
        <input onChange={(e) => setValue(e.target.value)} value={value} placeholder="search" />
      <TarkovMarket name={text} />
      <div className="tags-ctrl">
        <div className="tags">
          
        </div>
      </div>
      </div>
      
      
    </div>
  );
};

export default App;
