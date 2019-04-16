import React from 'react'
import { Route } from 'react-router-dom'

import Login from './onboarding/Login'
import Signup from './onboarding/Signup'
import Cards from './trips/Cards'

function App() {
  return (
    <>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Cards />
    </>
  )
}

export default App
