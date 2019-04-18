import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Login from './onboarding/Login'
import Signup from './onboarding/Signup'
import Trips from './trips/Trips'
import TripDetail from './trips/TripDetail'
import CreateTrip from './guide/CreateTrip'
import MyTrips from './guide/MyTrips'
import EditTrip from './guide/EditTrip'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

function App() {
  return (
    <>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute exact path="/trips" component={Trips} />
      <PrivateRoute exact path="/trips/:id" component={TripDetail} />
      <PrivateRoute path="/create-trip" component={CreateTrip} />
      <PrivateRoute exact path="/guide" component={MyTrips} />
      <PrivateRoute path="/guide/edit/:id" component={EditTrip} />
    </>
  )
}

export default App
