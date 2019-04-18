import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Login from './onboarding/Login'
import Signup from './onboarding/Signup'
import Cards from './trips/Cards'
import CreateTrip from './guide/CreateTrip'
import TripDetail from './trips/TripDetail'

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
      <PrivateRoute exact path="/trips" component={Cards} />
      <PrivateRoute path="/create-trip" component={CreateTrip} />
      <PrivateRoute exact path="/trips/:id" component={TripDetail} />
    </>
  )
}

export default App
