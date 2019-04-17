import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const submitLogin = async e => {
    e.preventDefault()

    const user = {
      username,
      password
    }

    try {
      const response = await axios.post(
        'https://build-week-wanderlust.herokuapp.com/api/auth/login',
        user
      )
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.user)
      props.history.push('/trips')
    } catch (error) {
      console.error(error)
      setMessage(error.response.data.message)
    }
  }

  return (
    <FormContainer>
      <Message>{message}</Message>
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

      <p>
        Not yet registered?
        <Link to="/signup">Sign-up</Link>
      </p>
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

  a {
    margin-left: 5px;
  }
`

const Message = styled.p`
  height: 50px;
  text-align: center;
  color: red;
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
    border: 1px solid gainsboro;
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
    border: 1px solid mediumseagreen;
    cursor: pointer;
  }
`
