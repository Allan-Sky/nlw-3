import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CreateOrphanage from './pages/CreateOrphanage'
import Lading from './pages/Lading'
import Orphanage from './pages/Orphanage'
import OrpharnagesMap from './pages/OrphanagesMap'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route  path="/" exact component={Lading}/>
                <Route  path="/app"  component={OrpharnagesMap}/>

                <Route  path="/orphanages/create"  component={CreateOrphanage}/>
                <Route  path="/orphanages/:id"  component={Orphanage}/>

            </Switch>
        </BrowserRouter>
    )
}

export default Routes