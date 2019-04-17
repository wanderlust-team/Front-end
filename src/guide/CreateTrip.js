import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Calendar from 'react-calendar'

function CreateTrip(props) {
  const today = new Date()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)

  const submitCreateTrip = async e => {
    e.preventDefault()

    const newTrip = {
      tripName: title,
      description,
      location,
      startDate: Number(moment(startDate).format('YYYYMMDD')),
      endDate: Number(moment(endDate).format('YYYYMMDD')),
      userId: localStorage.getItem('userId')
    }

    try {
      const options = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }

      await axios.post(
        'https://build-week-wanderlust.herokuapp.com/api/trips',
        newTrip,
        options
      )
      props.history.push('/trips')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={submitCreateTrip}>
      <label>
        Title
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          type="text"
          required
        />
      </label>

      <label>
        Description
        <textarea onChange={e => setDescription(e.target.value)} required />
      </label>

      <label>
        Location
        <input
          onChange={e => setLocation(e.target.value)}
          value={location}
          type="text"
          required
        />
      </label>

      <label>
        Depart
        <Calendar
          calendarType="US"
          onChange={date => setStartDate(date)}
          value={startDate}
          minDate={today}
        />
      </label>

      <label>
        Return
        <Calendar
          calendarType="US"
          onChange={date => setEndDate(date)}
          value={endDate}
          minDate={startDate}
        />
      </label>

      <button>Create Trip</button>
    </form>
  )
}

export default CreateTrip
