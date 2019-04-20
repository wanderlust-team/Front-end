import React, { useState } from 'react'
import axios from 'axios'
import { formatDate } from 'react-day-picker/moment'
import styled from 'styled-components'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import Navigation from '../navigation/Navigation'

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
    <>
      <Navigation {...props} />

      <HeaderContainer>
        <h1>Plan your next experience</h1>
        <p>Make new friends and don't forget to invite the existing ones!</p>
      </HeaderContainer>

      <Form onSubmit={submitCreateTrip}>
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
            format="MMM Do, YYYY"
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
            format="MMM Do, YYYY"
            formatDate={formatDate}
            placeholder="on"
            dayPickerProps={{
              disabledDays: { before: startDate }
            }}
          />
        </label>

        <label>
          Description
          <textarea onChange={e => setDescription(e.target.value)} required />
        </label>

        <ButtonsContainer>
          <CancelButton
            type="button"
            onClick={() => props.history.push('/trips')}
          >
            Cancel
          </CancelButton>

          <CreateButton type="submit">Create Trip</CreateButton>
        </ButtonsContainer>
      </Form>
    </>
  )
}

export default CreateTrip

const HeaderContainer = styled.div`
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

const CreateButton = styled.button`
  height: 50px;
  width: 200px;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #d14545;
  background-image: linear-gradient(to right, #d14545, #ff9933);
  border: 2px solid #d14545;
  border-radius: 5px;
  cursor: pointer;
`
