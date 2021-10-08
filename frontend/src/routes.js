import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Rating from './pages/Rating'
import RatingSuccess from './pages/RatingSuccess';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Rating}></Route>
                <Route path='/obrigado-pela-contribuicao' component={RatingSuccess}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes