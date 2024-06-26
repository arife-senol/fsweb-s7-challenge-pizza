import React from 'react'
import './EndPage.css'
export default function EndPage({fromAppOrderData}) {
  //const fromAppOrderData = props.fromAppOrderData
  console.log("end page e gelen verim",fromAppOrderData)
  const malzemeler = fromAppOrderData.ingredients;
  console.log("malzemelerim",malzemeler)
  return (
    <div className='endPageDiv'>
        <p id= "p-endPage">lezzetin yolda!</p>
        <p>SİPARİŞ ALINDI!</p>
        <hr/>
        <p id= "başlık-endPage">Position Absolute Acı Pizza</p>
        <div className = "order-form">
          <p>Boyut: {fromAppOrderData.size}</p>
          <p>Hamur: {fromAppOrderData.pizzaType}</p>
          <p>Ek Malzemeler: {malzemeler.join(",")}</p>
        </div>
       <div className ="order-toplam">
        <h4>Sipariş Toplamı</h4>
        <p id= "seçimler-endpage">Seçimler {malzemeler.length*5}.00₺ </p>
        <p id= "toplam-endpage">Toplam {(fromAppOrderData.pizzaTotals).toFixed(2)}₺ </p>
       </div>
    </div>
  )
}


