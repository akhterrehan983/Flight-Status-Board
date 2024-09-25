import React from "react";
import './Loader.css'; // Assuming the Loader.css is present

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="wait"></div>
      <div className="iata_code departure_city" style={{ marginLeft: 50,fontWeight:700}}>Travelopia</div>
      <div className="plane">
        <img src="https://zupimages.net/up/19/34/4820.gif" className="plane-img" alt="Loading" />
      </div>
      <div className="earth-wrapper">
        <div className="earth"></div>
      </div>
      <div className="iata_code arrival_city"></div>
    </div>
  );
};

export default Loader;
