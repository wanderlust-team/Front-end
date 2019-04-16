import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Cards() {
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

  return trips.map(trip => (
    <div key={trip.id}>
      <p>{trip.tripName}</p>
      <p>{trip.location}</p>
    </div>
  ))
}

export default Cards
