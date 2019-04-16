import React, { useState } from 'react'
import Calendar from 'react-calendar'

function CheckoutGuide() {
  const today = new Date()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dates, setDates] = useState([today, today])

  const submitCreateTour = e => {
    e.preventDefault()
    console.log('Create tour successful')
  }

  return (
    <form onSubmit={submitCreateTour}>
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

      <button>Create Tour</button>
    </form>
  )
}

export default CheckoutGuide
