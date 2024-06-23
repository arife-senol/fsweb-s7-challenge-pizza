import React from 'react'
import { useHistory } from 'react-router-dom'
import "./MainPage.css"
export default function MainPage() {

  return (
    <div className='main-page'>
        <main className='main-page-section'>
            <h1>
              KOD ACIKTIRIR <br/>
              PİZZA, DOYURUR  
            </h1>
            <div className='ordered-btn-div'>
                <button className='ordered-btn'> 
                    ACIKTIM</button>
            </div>
        </main>
    </div>
  )
}

