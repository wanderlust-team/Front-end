import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { startCase } from 'lodash'

import styled from 'styled-components'
import { Map } from 'styled-icons/boxicons-regular'
import { Spinner9 } from 'styled-icons/icomoon'
import { Trash } from 'styled-icons/boxicons-regular'
import { Edit } from 'styled-icons/boxicons-regular'

import Navigation from '../navigation/Navigation'

function MyTrips(props) {
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
    getTrips()
  }, [])

  useEffect(() => {
    const getImages = async () => {
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
      } catch (error) {
        console.error(error)
      }
    }
    getImages()
  }, [])

  const deleteTrip = async tripId => {
    setIsLoading(true)

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
      setTrips(trips.filter(trip => trip.id !== tripId))
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const userId = localStorage.getItem('userId')

  const myTrips = trips.filter(trip => trip.userId === Number(userId))

  return (
    <>
      <Navigation {...props} />

      <HeaderContainer>
        <h1>Places you've been</h1>
        {myTrips.length === 1
          ? `You've had ${myTrips.length} unique experience so far.`
          : `You've had ${myTrips.length} unique experiences so far.`}
      </HeaderContainer>

      <CardsContainer>
        {isLoading && <Spinner9 size="42" />}

        {myTrips.map((trip, index) => (
          <Card key={trip.id}>
            <img
              src={images[index % 10].urls.small}
              alt={images[index % 10].alt_description}
            />

            <Name>{startCase(trip.tripName)}</Name>

            <Location>
              <Map size="18" />
              {startCase(trip.location)}
            </Location>

            <StyledEdit
              size="22"
              onClick={() => props.history.push(`/guide/edit/${trip.id}`)}
            />

            <StyledTrash size="22" onClick={() => deleteTrip(trip.id)} />
          </Card>
        ))}

        {!isLoading &&
          !myTrips.length &&
          'You have no trips. Would you like to create one?'}
      </CardsContainer>
    </>
  )
}

export default MyTrips

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

const StyledEdit = styled(Edit)`
  color: slategray;
  cursor: pointer;
  margin-right: 5px;
  visibility: hidden;
`

const StyledTrash = styled(Trash)`
  color: lightcoral;
  cursor: pointer;
  margin-left: 5px;
  visibility: hidden;
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

  &:hover ${StyledEdit} {
    visibility: visible;
  }

  &:hover ${StyledTrash} {
    visibility: visible;
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
