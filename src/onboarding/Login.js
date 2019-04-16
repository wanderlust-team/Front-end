import React, { useState } from 'react'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = async e => {
    e.preventDefault()

    const user = {
      username,
      password
    }

    try {
      await axios.post(
        'https://build-week-wanderlust.herokuapp.com/api/auth/login',
        user
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <p>Log In</p>

      <form onSubmit={submitLogin}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        <button>Log In</button>
      </form>
    </>
  )
}

export default Login
