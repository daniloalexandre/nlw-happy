import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import React from 'react';

function Router () {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" component={Landing} exact/>
            <Route path="/app" component={OrphanagesMap} />
        </Switch>
            
        </BrowserRouter>
    )
}

export default Router;