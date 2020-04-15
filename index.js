//follow the comments in their numbered order below (1, 2)

import React, { useContext , useState } from 'react'
import { Context } from '../../Context/Context'
import availableTimesJSON from './Form Imports/availableTimesList.json'
import allBookings from '../root/imports/allBookings'
import { currentTime } from '../../constants/CurrentTime'

const TimeGrid = () => {
  const { theme, timesUnavailable, removeFromTimesUnavailable, addToTimesUnavailable } = useContext(
    Context,
  )
  const allBookedTimes = allBookings.map(element => element.time)
  const availableTimes = availableTimesJSON.map(item => item.time)


  
  const counts = {} //this will have something like 2230: 1, 2300: 5, 2330: 3
  availableTimes.forEach(x => {
    counts[x] = (counts[x] || 0) + 1
  })

  const timeAlreadyDisplayed = []
  const displayAvailableTimesJSON = availableTimesJSON.map((item, index) => {
    
    if (index > 0 &&
      item.time === availableTimesJSON[index - 1].time &&
      item.time !== availableTimesJSON[index - 2].time) {
      return ( 
    //2. But this span won't update to reflect the decrese in number. How to solve this?
        <span> {counts[`${item.time}`]} </span>
      )
    }
    else if (item.time > currentTime - 10 && !timeAlreadyDisplayed[item.time]) {
      timeAlreadyDisplayed[item.time] = true
      return (
        <li
          key={item.id}
          id={item.id}
          onClick={() => {
              //1. this onClick should decrease the number at 'counts'. I believe it does...
            counts[`${item.time}`] > 1 ? counts[`${item.time}`]-- :
            allBookedTimes.includes(item.time) && item.day === 'today'
              ? void 0
              timesUnavailable.includes(item)
                ? removeFromTimesUnavailable(item)
                : addToTimesUnavailable(item)
          }}
          className={
            timesUnavailable.find(element => item.id === element.id && item.time === element.time)
              ? 'time-blocked'
              : allBookedTimes.includes(item.time) && item.day === 'today'
                ? 'time-booked'
                : ''
          }>
          {`${item.time[0]}${item.time[1]}:${item.time[2]}${item.time[3]}`}
        </li>
      )
    } else { 
      return null
    }
  })

  return (
    <div className={`TimeGrid-${theme}`}>
      <ul>{displayAvailableTimesJSON}</ul>
    </div>
  )
}

export default TimeGrid
