import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

render(
    
    <BrowserRouter>
    {console.log('hello?')}
        <App/>
    </BrowserRouter>,
    document.getElementById('main')
)