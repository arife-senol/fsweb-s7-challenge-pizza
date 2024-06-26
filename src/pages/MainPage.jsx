import React from "react";
import { useHistory } from "react-router-dom";
import "./MainPage.css";
import { toast } from "react-toastify";
export default function MainPage() {
  let history = useHistory();
  function handleClick() {
    toast("Sipariş sayfası yükleniyor..")
    history.push("./orderForm");
  }
  return (
    <div className="main-page">
      <main className="main-page-section">
        <h1>
          KOD ACIKTIRIR <br />
          PİZZA, DOYURUR
        </h1>
        <div className="ordered-btn-div">
          <button className="ordered-btn" onClick={handleClick}>
            ACIKTIM
          </button>
        </div>
      </main>
    </div>
  );
}
