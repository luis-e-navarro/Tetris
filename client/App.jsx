import React from "react";
import { Switch, Route } from 'react-router-dom';


import Scores from './client/components';
import Board from '.client/components';

const App = () => {
    return(
        <Switch>
            <Route exact path = '/' component = {Scores} />
            <Route exact path = '/' component = { Board} />

        </Switch>
    )
}


export default App