import React from "react";
import Demo from './Demo'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function(){
    return (
        <div>
            <h1>Demo</h1>
            <Link to='/demo'>
                <button >Emails</button>
            </Link>
        </div>
    )
}