import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './App.css';
import Demo from './Pages/Demo'   //copy with your page name to call it


function App() {
  return (
    <Router>
        <Routes>
             <Route path="/demo" element={<Demo />} />    
        </Routes>
    </Router>
  );
}

export default App;
