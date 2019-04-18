import React from 'react'
import styled from 'styled-components'

import logo from '../assets/logo.png'

function LogoHeader() {
  return (
    <Header>
      <img src={logo} alt="wanderlust logo" />
    </Header>
  )
}

export default LogoHeader

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
`
