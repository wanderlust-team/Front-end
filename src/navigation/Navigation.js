import React from 'react'
import { Link } from 'react-router-dom'

function Navigation({ history }) {
  const logout = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div>
      <Link to="/create-trip">Create a Trip</Link>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Navigation
