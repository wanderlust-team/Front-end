import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { formatDate } from 'react-day-picker/moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
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

  const id = props.match.params.id

  useEffect(() => {
    const getTripById = async () => {
      try {
        const options = {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
        const response = await axios.get(
          `https://build-week-wanderlust.herokuapp.com/api/trips/${id}`,
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
      startDate: Number(formatDate(endDate, 'YYYYMMDD')),
      endDate: Number(formatDate(endDate, 'YYYYMMDD')),
      userId: localStorage.getItem('userId')
    }

    try {
      const options = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }

      await axios.put(
        `https://build-week-wanderlust.herokuapp.com/api/trips/${id}`,
        newTrip,
        options
      )
      props.history.push('/guide')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Navigation {...props} />

      <H1>Trip overview</H1>

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
          <DayPickerInput
            onDayChange={date => setStartDate(date)}
            value={startDate}
            format="ddd, MMM Do, YYYY"
            formatDate={formatDate}
            placeholder="from"
            dayPickerProps={{
              disabledDays: { before: today }
            }}
          />
        </label>

        <label>
          End
          <DayPickerInput
            onDayChange={date => setEndDate(date)}
            value={endDate}
            format="ddd, MMM Do, YYYY"
            formatDate={formatDate}
            placeholder="on"
            dayPickerProps={{
              disabledDays: { before: startDate }
            }}
          />
        </label>

        <ButtonsContainer>
          <CancelButton
            type="button"
            onClick={() => props.history.push('/guide')}
          >
            Cancel
          </CancelButton>

          <SaveButton type="submit">Save</SaveButton>
        </ButtonsContainer>
      </Form>
    </>
  )
}

export default EditTrip

const H1 = styled.h1`
  width: 1000px;
  margin: 30px auto;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  width: 600px;
  margin: 10px auto;
`

const CancelButton = styled.button`
  height: 50px;
  width: 200px;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  color: slategray;
  border: 2px solid slategray;
  border-radius: 5px;
  cursor: pointer;
`

const SaveButton = styled.button`
  height: 50px;
  width: 200px;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #d14545;
  background-image: linear-gradient(to right, #d14545, #ff9933);
  border-radius: 5px;
  cursor: pointer;
`
