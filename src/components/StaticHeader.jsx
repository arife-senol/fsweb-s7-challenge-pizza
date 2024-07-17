import React from 'react'

export default function StaticHeader() {
  return (
    <header style={
        {display:'flex',
         flexDirection: 'column',
         alignItems: 'center',
         padding: '3rem',
         backgroundColor: '#CE2829'   
        }
        }>
        <a href="/">
        <img src="./Assets/mile1-assets/logo.svg" alt="logo" />
        </a>
    </header>
       
  )
}
