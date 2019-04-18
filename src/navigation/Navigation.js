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
        <Link to="/trips">
          <img src={logo} alt="wanderlust logo" />
        </Link>

        <div>
          <CreateTripLink to="/create-trip">Create a Trip</CreateTripLink>
          <StyledPersonPin size="36" onClick={() => setIsOpen(!isOpen)} />
        </div>
      </Header>

      {isOpen && (
        <MenuContainer>
          <MyTripsLink to="/guide">My Trips</MyTripsLink>
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

const CreateTripLink = styled(Link)`
  text-decoration: none;
  color: black;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-bottom: 3px solid slategray;
  }
`

const StyledPersonPin = styled(PersonPin)`
  cursor: pointer;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-bottom: 3px solid slategray;
  }
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80px;
  right: 1px;
  width: 100px;
  box-shadow: 0px 0px 10px 0px gainsboro;

  p {
    width: 100%;
    height: 40px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    cursor: pointer;

    &:hover {
      background: whitesmoke;
    }
  }
`

const MyTripsLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: whitesmoke;
  }
`
