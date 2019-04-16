import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
    <Form onSubmit={submitSignup}>
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
    </Form>
  )
}

export default Signup

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 800px;
  width: 400px;
  margin: auto;

  input {
    width: 380px;
    height: 50px;
    margin: 10px 0;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 18px;
    outline: none;
  }

  select {
    background: transparent;
    height: 30px;
    width: 100px;
    margin: 10px;
    cursor: pointer;
    outline: none;
  }

  button {
    height: 50px;
    width: 380px;
    margin: 10px 0;
    outline: none;
    font-size: 18px;
    font-weight: 500;
    color: white;
    background-color: mediumseagreen;
    cursor: pointer;
  }
`
