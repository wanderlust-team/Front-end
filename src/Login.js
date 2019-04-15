import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const handleUsername = e => setUsername(e.target.value)

  const [password, setPassword] = useState('')
  const handlePassword = e => setPassword(e.target.value)

  const submitLogin = e => {
    e.preventDefault()
    console.log('Login successful')
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
            onChange={handleUsername}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </label>

        <button>Log In</button>
      </form>
    </>
  )
}

export default Login
