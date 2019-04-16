import React from 'react'
import { Route } from 'react-router-dom'

import Login from './onboarding/Login'
import Signup from './onboarding/Signup'

function App() {
  return (
    <>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
    </>
  )
}

export default App
