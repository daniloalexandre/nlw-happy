import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateOrphanage from './pages/CreateOrphanage';
import Landing from './pages/Landing';
import Orphanage from './pages/Orphanage';
import OrphanagesMap from './pages/OrphanagesMap';
import React from 'react';

function Router () {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" component={Landing} exact/>
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />
        </Switch>
            
        </BrowserRouter>
    )
}

export default Router;