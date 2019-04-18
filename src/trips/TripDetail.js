import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

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
          `https://build-week-wanderlust.herokuapp.com/api/trips/${props.match.params.id}`,
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
    <div>
      <p>Name: {trip.tripName}</p>
      <p>Location: {trip.location}</p>
      <p>Description: {trip.description}</p>
      <p>
        Dates: {moment(`${trip.startDate}`, 'YYYYMMDD').format('MMM Do, YYYY')} - {moment(`${trip.endDate}`, 'YYYYMMDD').format('MMM Do, YYYY')}
      </p>
    </div>
  )
}

export default TripDetail
