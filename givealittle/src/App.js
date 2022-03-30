import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './App.css';
import Demo from './Pages/Demo'   //copy with your page name to call it

function App() {
  return (
    <Router>
        <Routes>
             <Route path="/demo" element={<Demo />} />    //when you want to test your page, replace the demo with your page details here. As soon as you are done, RESTORE IT TO THE STATE IN WHICH YOU FOUND IT
        </Routes>
    </Router>
  );
}

export default App;
