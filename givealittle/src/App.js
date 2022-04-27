//All pages imported to this folder
import './App.css';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Landing from './Pages/Landing'
import SellersLanding from './Pages/SellersLanding';
import Sell from './Pages/Sell'
import About from './Pages/About'
import MakeTransaction from "./Pages/MakeTransaction";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NameContext, LoginContext, CartContext } from './Context'      //imports all global contexts in here where they will be initialized
import { useState } from 'react'

function App() {

  const [name, setName] = useState("")    //global context for name of client

  const [login, setLogin] = useState(false)   //global context for knowing if someone is logged in

  const [cart, setCart] = useState("")      //global context for a persons cart
  return (
    <CartContext.Provider value={{ cart, setCart }}>      {/*provider for global cart*/}
      <LoginContext.Provider value={{ login, setLogin }}>   {/*provider for global login checker*/}
        <NameContext.Provider value={{ name, setName }} >   {/*provider for global name*/}
          <Router>                       {/*stores all the routes to all pages*/}
            <Switch>                      {/*allows for different routes*/}
              <Route exact path="/">        {/*route to home page*/}
                <Home />
              </Route>

              <Route path="/login">             {/*route to login page*/}
                <Login />
              </Route>

              <Route path="/signup">              {/*route to signup page*/}
                <Signup />
              </Route>

              <Route path="/landing">                 {/*route to landing page*/}
                <Landing />
              </Route>

              <Route path="/sellerslanding">        {/*route to sellers landing page*/}
                <SellersLanding />
              </Route>

              <Route path="/sell">                  {/*route to sell page*/}
                <Sell />
              </Route>

              <Route path="/about">                 {/*route to about page*/}
                <About />
              </Route>

              <Router path="/MakeTransaction">
                <MakeTransaction />
              </Router>

            </Switch>
          </Router>

        </NameContext.Provider>
      </LoginContext.Provider>
    </CartContext.Provider>
  );
}

export default App;