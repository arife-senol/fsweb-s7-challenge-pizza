import { useState } from 'react'
import reactLogo from './assets/react.svg'
import workintech from '/workintech.svg'
import './App.css'
import MainPage from './pages/MainPage'
import StaticHeader from './components/StaticHeader'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import OrderFormPage from './pages/OrderFormPage'
import EndPage from './pages/EndPage'

function App() {
  

  return (
  
  <BrowserRouter>
    <StaticHeader/>
   <Switch>
    <Route exact path="/">
    <MainPage/>
    </Route>
    <Route exact path="/orderForm">
    <OrderFormPage/>
    </Route>
    <Route exact path="/end">
    <EndPage/>
    </Route>
    </Switch>
    </BrowserRouter>
   
 
  
  )
}

export default App
