import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styled from 'styled-components'
import { Map } from 'styled-icons/boxicons-regular'
import { Spinner9 } from 'styled-icons/icomoon'

import Navigation from '../navigation/Navigation'
import image from '../assets/manuel-meurisse-unsplash.jpg'

function MyTrips(props) {
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

  const deleteTrip = async tripId => {
    try {
      const options = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
      await axios.delete(
        `https://build-week-wanderlust.herokuapp.com/api/trips/${tripId}`,
        options
      )
      props.history.push('/guide')
    } catch (error) {
      console.error(error)
    }
  }

  const userId = localStorage.getItem('userId')

  const myTrips = trips.filter(trip => trip.userId === Number(userId))

  return (
    <>
      <Navigation {...props} />

      <CardsContainer>
        {trips.length === 0 ? (
          <Spinner9 size="42" />
        ) : (
          myTrips.map(trip => (
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
                <button>Edit</button>
                <button onClick={() => deleteTrip(trip.id)}>Delete</button>
              </Card>
            </Link>
          ))
        )}
      </CardsContainer>
    </>
  )
}

export default MyTrips

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
