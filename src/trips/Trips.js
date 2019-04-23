import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { startCase } from 'lodash'

import styled from 'styled-components'
import { Map } from 'styled-icons/boxicons-regular'
import { Spinner9 } from 'styled-icons/icomoon'

import Navigation from '../navigation/Navigation'

function Trips(props) {
  const [trips, setTrips] = useState([])
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const page = 1

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

    const getImages = async () => {
      setIsLoading(true)

      try {
        const options = {
          headers: {
            Authorization:
              'Client-ID 5afca5fc526442a0d2db270e57a9d099901cbacab46dadec1e806eab80312e53'
          }
        }
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=wanderlust&orientation=portrait&page=${page}`,
          options
        )
        setImages(response.data.results)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    getTrips()
    getImages()
  }, [])

  return (
    <>
      <Navigation {...props} />

      <HeaderContainer>
        <h1>Trips around the world</h1>
        <p>Start exploring ideas for your next trip.</p>
      </HeaderContainer>

      <CardsContainer>
        {isLoading && <Spinner9 size="42" />}
        {trips.map((trip, index) => (
          <Link
            to={`/trips/${trip.id}`}
            key={trip.id}
            style={{ textDecoration: 'none' }}
          >
            <Card>
              <img
                src={images[index % 10].urls.small}
                alt={images[index % 10].alt_description}
              />
              <Name>{startCase(trip.tripName)}</Name>
              <Location>
                <Map size="18" />
                {startCase(trip.location)}
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

const HeaderContainer = styled.div`
  width: 1000px;
  margin: 30px auto;
  text-align: center;
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 1000px;
  margin: auto;
`

const Card = styled.div`
  width: 300px;
  margin: 15px;
  text-align: center;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
