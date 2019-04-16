import React, { useState } from 'react'
import Calendar from 'react-calendar'

function CheckoutTourist() {
  const today = new Date()

  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(checkIn)
  const [guests, setGuests] = useState('1')

  const submitBookTour = e => {
    e.preventDefault()
    console.log('Book tour successful')
  }

  return (
    <form onSubmit={submitBookTour}>
      <label>
        Check-in
        <Calendar
          calendarType="US"
          onChange={date => setCheckIn(date)}
          value={checkIn}
          minDate={today}
        />
      </label>

      <label>
        Check-out
        <Calendar
          calendarType="US"
          onChange={date => setCheckOut(date)}
          value={checkOut}
          minDate={checkIn}
        />
      </label>

      <label>
        Guests
        <input
          onChange={e => setGuests(e.target.value)}
          value={guests}
          type="number"
        />
      </label>

      <button>Book Tour</button>
    </form>
  )
}

export default CheckoutTourist
