import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styled from 'styled-components'
import { Map } from 'styled-icons/boxicons-regular'
import { Spinner9 } from 'styled-icons/icomoon'

import Navigation from '../navigation/Navigation'
import image from '../assets/manuel-meurisse-unsplash.jpg'

function Trips(props) {
  const [trips, setTrips] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getTrips = async () => {
      setIsLoading(true)
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
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    getTrips()
  }, [])

  return (
    <>
      <Navigation {...props} />

      <CardsContainer>
        {isLoading && <Spinner9 size="42" />}
        {trips.map(trip => (
          <Link
            to={`/trips/${trip.id}`}
            key={trip.id}
            style={{ textDecoration: 'none' }}
          >
            <Card>
              <img
                src={image}
                alt="woman sitting on cliff overlooking body of water near mountains during daytime"
              />
              <Name>{trip.tripName}</Name>
              <Location>
                <Map size="18" />
                {trip.location}
              </Location>
            </Card>
          </Link>
        ))}

        {!isLoading &&
          !trips.length &&
          'There are no trips yet. Would you like to create one?'}
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
  min-height: 800px;
  margin: auto;
`

const Card = styled.div`
  width: 200px;
  margin: 15px;
  text-align: center;

  img {
    width: 200px;
  }
`

const Name = styled.p`
  font-weight: 600;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Location = styled.p`
  color: slategray;
`
