import React, { useState } from 'react'
import axios from 'axios'

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('tourist')

  const submitSignup = async e => {
    e.preventDefault()

    const newUser = {
      username,
      password,
      email,
      userType: role
    }

    try {
      await axios.post(
        'https://build-week-wanderlust.herokuapp.com/api/auth/register',
        newUser
      )
    } catch (error) {
      console.error(error)
    }
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

        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          You are a
          <select onChange={e => setRole(e.target.value)} required>
            <option value="tourist">tourist</option>
            <option value="guide">guide</option>
          </select>
        </label>

        <button>Create Account</button>
      </form>
    </>
  )
}

export default Signup
