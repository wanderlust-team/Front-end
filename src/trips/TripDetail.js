import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import styled from 'styled-components'
import { Map } from 'styled-icons/boxicons-regular'
import { Calendar } from 'styled-icons/boxicons-regular'

import Navigation from '../navigation/Navigation'
import image from '../assets/manuel-meurisse-unsplash.jpg'

function TripDetail(props) {
  const [trip, setTrip] = useState({})

  useEffect(() => {
    const getTrip = async () => {
      try {
        const options = {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
        const response = await axios.get(
          `https://build-week-wanderlust.herokuapp.com/api/trips/${
            props.match.params.id
          }`,
          options
        )
        setTrip(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getTrip()
  }, [])

  return (
    <>
      <Navigation {...props} />

      <TripContainer>
        <img
          src={image}
          alt="woman sitting on cliff overlooking body of water near mountains during daytime"
        />

        <div>
          <h1>{trip.tripName}</h1>

          <Summary>
            <p>
              <StyledMap size="24" />
              {trip.location}
            </p>
            <p>
              <StyledCalendar size="24" />
              {moment(`${trip.startDate}`, 'YYYYMMDD').format(
                'MMM Do, YYYY'
              )}{' '}
              to {moment(`${trip.endDate}`, 'YYYYMMDD').format('MMM Do, YYYY')}
            </p>
          </Summary>

          <Description>
            <h2>What we'll do</h2>
            <p>{trip.description}</p>
          </Description>
        </div>
      </TripContainer>
    </>
  )
}

export default TripDetail

const TripContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 20px;
  width: 1000px;
  margin: 20px auto;

  img {
    height: 500px;
    width: 500px;
    object-fit: cover;
  }

  h1 {
    font-size: 40px;
  }
`

const StyledMap = styled(Map)`
  margin-right: 5px;
`

const StyledCalendar = styled(Calendar)`
  margin-right: 5px;
`

const Summary = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid gainsboro;
`

const Description = styled.div`
  padding: 20px 0;

  p {
    line-height: 1.5;
  }
`
