import React from 'react'
import logo from '../../Assets/mile1-assets/logo.svg'
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
        <img  src={logo} alt="logo" />
        </a>
    </header>
       
  )
}
