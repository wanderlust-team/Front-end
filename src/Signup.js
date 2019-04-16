import React, { useState } from 'react'

function Signup() {
  const [username, setUsername] = useState('')
  const handleUsername = e => setUsername(e.target.value)

  const [password, setPassword] = useState('')
  const handlePassword = e => setPassword(e.target.value)

  const [retypePassword, setRetypePassword] = useState('')
  const handleRetypePassword = e => setRetypePassword(e.target.value)

  const [email, setEmail] = useState('')
  const handleEmail = e => setEmail(e.target.value)

  const submitSignup = e => {
    e.preventDefault()
    console.log('Signup successful')
  }

  return (
    <>
      <p>Sign Up</p>

      <form onSubmit={submitSignup}>
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

        <label>
          Re-type password
          <input
            type="password"
            value={retypePassword}
            onChange={handleRetypePassword}
            required
          />
        </label>

        <label>
          E-mail
          <input type="email" value={email} onChange={handleEmail} required />
        </label>

        <label>
          Your role
          <select required>
            <option value="guide">Tour guide</option>
            <option value="tourist">Tourist</option>
          </select>
        </label>

        <button>Create account</button>
      </form>
    </>
  )
}

export default Signup
