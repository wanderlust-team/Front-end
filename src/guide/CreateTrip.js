import React, { useState } from 'react'
import Calendar from 'react-calendar'

function CreateTrip() {
  const today = new Date()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dates, setDates] = useState([today, today])

  const submitCreateTrip = e => {
    e.preventDefault()
    console.log('Create tour successful')
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
        Dates
        <Calendar
          calendarType="US"
          selectRange
          onChange={date => setDates(date)}
          value={dates}
          minDate={today}
        />
      </label>

      <button>Create Trip</button>
    </form>
  )
}

export default CreateTrip
