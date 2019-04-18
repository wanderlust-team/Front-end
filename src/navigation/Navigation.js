import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { PersonPin } from 'styled-icons/material'

import logo from '../assets/logo.png'

function Navigation({ history }) {
  const [isOpen, setIsOpen] = useState(false)

  const logout = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <>
      <Header>
        <img src={logo} alt="wanderlust logo" />
        <div>
          <StyledLink to="/create-trip">Create a Trip</StyledLink>
          <StyledPersonPin size="36" onClick={() => setIsOpen(!isOpen)} />
        </div>
      </Header>

      {isOpen && (
        <MenuContainer>
          <p>My Trips</p>
          <p onClick={() => logout()}>Logout</p>
        </MenuContainer>
      )}
    </>
  )
}

export default Navigation

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 15px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid lightgrey;

  img {
    margin-left: 20px;
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 15%;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    padding-bottom: 10px;
    border-bottom: 1px solid mediumseagreen;
  }
`

const StyledPersonPin = styled(PersonPin)`
  cursor: pointer;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80px;
  right: 5px;
  width: 100px;
  box-shadow: 0px 0px 10px 0px gainsboro;

  p {
    padding: 10px 0;
    margin: 0;
    cursor: pointer;
  }
`
