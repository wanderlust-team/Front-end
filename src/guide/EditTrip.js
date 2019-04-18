import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Calendar from 'react-calendar'
import styled from 'styled-components'

import Navigation from '../navigation/Navigation'

function EditTrip(props) {
  const today = new Date()

  const [trip, setTrip] = useState({})
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)

  useEffect(() => {
    const getTripById = async () => {
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
        setTitle(response.data.tripName)
        setDescription(response.data.description)
        setLocation(response.data.location)
      } catch (error) {
        console.error(error)
      }
    }
    getTripById()
  }, [])

  const submitEditTrip = async e => {
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

      await axios.put(
        `https://build-week-wanderlust.herokuapp.com/api/trips/${
          props.match.params.id
        }`,
        newTrip,
        options
      )
      props.history.push('/trips')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Navigation {...props} />

      <Form onSubmit={submitEditTrip}>
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
          <textarea
            onChange={e => setDescription(e.target.value)}
            value={description}
            required
          />
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
          Start
          <Calendar
            calendarType="US"
            onChange={date => setStartDate(date)}
            value={startDate}
            minDate={today}
          />
        </label>

        <label>
          End
          <Calendar
            calendarType="US"
            onChange={date => setEndDate(date)}
            value={endDate}
            minDate={startDate}
          />
        </label>

        <button onClick={() => props.history.push('/guide')}>
          Cancel
        </button>

        <SaveButton>Save</SaveButton>
      </Form>
    </>
  )
}

export default EditTrip

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 800px;
  width: 600px;
  margin: auto;

  input {
    width: 600px;
    height: 50px;
    margin: 10px 0;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid gainsboro;
    border-radius: 5px;
    font-size: 18px;
    outline: none;
  }

  textarea {
    width: 600px;
    height: 200px;
    margin: 10px 0;
    padding: 10px;
    box-sizing: border-box;
    resize: none;
    outline: none;
    font-size: 18px;
    border: 1px solid gainsboro;
    border-radius: 5px;
  }
`

const SaveButton = styled.button`
  height: 50px;
  width: 400px;
  margin: 10px auto;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: mediumseagreen;
  border: 1px solid mediumseagreen;
  border-radius: 5px;
  cursor: pointer;
`
