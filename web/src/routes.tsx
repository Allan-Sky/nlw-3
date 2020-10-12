import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Lading from './pages/Lading'
import OrpharnagesMap from './pages/OrphanagesMap'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route  path="/" exact component={Lading}/>
                <Route  path="/app"  component={OrpharnagesMap}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes