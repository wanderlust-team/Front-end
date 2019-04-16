import React from 'react'

import Login from './Login'
import Signup from './Signup'
import CheckoutTourist from './cart/CheckoutTourist'
import CheckoutGuide from './cart/CheckoutGuide'

function App() {
  return (
    <>
      <Login />
      <Signup />
      <CheckoutTourist />
      <CheckoutGuide />
    </>
  )
}

export default App
