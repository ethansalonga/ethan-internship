import React, { useEffect, useState } from "react"

function Countdown({ expiryDate }) {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)

  useEffect(() => {
    startTimer()
  }, [])

  let cancelId
  let startTime
  let savedTime = 0
  const countdown = expiryDate - Date.now()

  function startTimer() {
    startTime = Date.now()
    cancelId = requestAnimationFrame(updateTimer)
  }

  function updateTimer() {
    let millisElapsed = savedTime + (Date.now() - startTime)
    let millisLeft = countdown - millisElapsed
    if (millisLeft < 0) {
      millisLeft = 0
      cancelAnimationFrame(cancelId)
      cancelId = null
    }

    let secondsLeft = millisLeft / 1000
    let minutesLeft = secondsLeft / 60
    let hoursLeft = minutesLeft / 60

    let secondsText = Math.floor(secondsLeft) % 60
    let minutesText = Math.floor(minutesLeft) % 60
    let hoursText = Math.floor(hoursLeft)

    setSeconds(secondsText)
    setMinutes(minutesText)
    setHours(hoursText)

    if (cancelId) {
      cancelId = requestAnimationFrame(updateTimer)
    }
  }

  return (
    <div>
      {hours}h {minutes}m {seconds}s
    </div>
  )
}

export default Countdown
