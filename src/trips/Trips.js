import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styled from 'styled-components'
import { Map } from 'styled-icons/boxicons-regular'

import Navigation from '../navigation/Navigation'

function Trips(props) {
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
          <Link
            to={`/trips/${trip.id}`}
            key={trip.id}
            style={{ textDecoration: 'none' }}
          >
            <Card>
              <Name>{trip.tripName}</Name>
              <Location>
                <Map size="18" />
                {trip.location}
              </Location>
            </Card>
          </Link>
        ))}
      </CardsContainer>
    </>
  )
}

export default Trips

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
