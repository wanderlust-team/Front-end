import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import LogoHeader from '../navigation/LogoHeader'

function Signup(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isGuide, setIsGuide] = useState(false)

  const submitSignup = async e => {
    e.preventDefault()

    const newUser = {
      username,
      password,
      email,
      guide: isGuide
    }

    try {
      const response = await axios.post(
        'https://build-week-wanderlust.herokuapp.com/api/auth/register',
        newUser
      )
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.user)
      props.history.push('/trips')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <LogoHeader />
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

        <CheckboxContainer>
          <input type="checkbox" onChange={() => setIsGuide(!isGuide)} /> Check
          this box if you are a tour guide
        </CheckboxContainer>

        <button>Create Account</button>
      </Form>
    </>
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
    border: 1px solid gainsboro;
    border-radius: 5px;
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
    background-color: #d14545;
    background-image: linear-gradient(to right, #d14545, #ff9933);
    border-radius: 5px;
    cursor: pointer;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 20px;
    margin-right: 5px;
  }
`
