import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Navigation from '../navigation/Navigation'

function Cards(props) {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    const getTrips = async () => {
      try {
        const response = await axios.get(
          'https://build-week-wanderlust.herokuapp.com/api/trips'
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
      {trips.map(trip => (
        <div key={trip.id}>
          <p>{trip.tripName}</p>
          <p>{trip.location}</p>
        </div>
      ))}
    </>
  )
}

export default Cards
