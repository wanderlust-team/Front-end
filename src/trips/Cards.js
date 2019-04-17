import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Navigation from '../navigation/Navigation'

function Cards(props) {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    const getTrips = async () => {
      try {
        const options = {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
        const response = await axios.get(
          'https://build-week-wanderlust.herokuapp.com/api/trips',
          options
        )
        setTrips(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getTrips()
  }, [])

  return (
    <>
      <Navigation {...props} />
      <CardsContainer>
        {trips.map(trip => (
          <Card key={trip.id}>
            <Name>{trip.tripName}</Name>
            <Location>{trip.location}</Location>
          </Card>
        ))}
      </CardsContainer>
    </>
  )
}

export default Cards

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 800px;
  margin: auto;
`

const Card = styled.div`
  border: 1px solid gainsboro;
  height: 200px;
  width: 200px;
  margin: 10px;
  padding: 5px;
  box-sizing: border-box;
  text-align: center;
`

const Name = styled.p`
  font-weight: 600;
`

const Location = styled.p`
  color: slategray;
`
