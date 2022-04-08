import './App.css';
import Home from './Pages/Home'
import Demo from './Pages/Demo'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home /> 
          </Route>

          <Route path="/demo">
            <Demo />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;