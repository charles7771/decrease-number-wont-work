const TimeGrid = () => {

  const reducer = (state, action) => {
    switch(action.type) {
      case 'SET_COUNTER':
        return {
          ...state,
          [`counter${action.id}`]: action.payload
        }
        default:
          return state
    }
  }
  let [{ counter }, dispatchReducer] = useReducer(reducer, {
    counter: '',
  })
  
  const { theme, timesUnavailable, 
        removeFromTimesUnavailable, 
        addToTimesUnavailable } = useContext(Context)

  
  const allBookedTimes = allBookings.map(element => element.time)
  //below, both have been mapped out of a JSON file
  const extractedTimesOnly = availableTimesJSON.map(item => item.time)
  const availableTimes = availableTimesJSON.map(item => item)
  
  
  const counts = {}
  availableTimes.forEach(x => {
    counts[x] = (counts[x] || 0) + 1
  })

  const timeAlreadyDisplayed = []
  
  const displayAvailableTimes = availableTimes.map((item, index) => {
    dispatchReducer({
      type: 'SET_COUNTER',
      id: item.id,
      payload: counts[`${item.time}`] //doesn't seem to be working
    })
    if (index > 0 &&
      item.time === availableTimes[index - 1].time &&
      item.time !== availableTimes[index - 2].time) {
      return (
        <span> {counter} </span>
      )
    }
    else if (item.time > currentTime - 10 && !timeAlreadyDisplayed[item.time]) {
      timeAlreadyDisplayed[item.time] = true
      return (
        <li
          key={item.id}
          id={item.id}
          onClick={() => {
            counter > 1 ? dispatchReducer({
              type: 'SET_COUNTER',
              id: item.id,
              payload: counter - 1
            }) :
              allBookedTimes.includes(item.time) && item.day === 'today'
                ? void 0
                timesUnavailable.includes(item)
                  ? removeFromTimesUnavailable(item)
                  : addToTimesUnavailable(item)
          }}>
          {item.time}
        </li>
      )
    } 
    return null
  })

  return (
    <>
      <ul>{displayAvailableTimes}</ul>
    </>
  )
}
