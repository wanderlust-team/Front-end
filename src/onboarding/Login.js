import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
    <FormContainer>
      <Form onSubmit={submitLogin}>
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
      </Form>

      <p>Not yet registered? Sign-up</p>
    </FormContainer>
  )
}

export default Login

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 800px;
  width: 400px;
  margin: auto;

  p {
    text-align: center;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  input {
    width: 380px;
    height: 50px;
    margin: 10px 0;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 18px;
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
