const shuttleLaunchDetails = []
let counter = 0
let launchDate = []

const main = () => {
  getNasaDetails()
  getLaunchDetail()
}

const getNasaDetails = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )

  const nasaData = await response.json()
  const mainImage = (document.querySelector(
    '.image-area'
  ).style.backgroundImage = "url('" + nasaData.hdUrl + "')")
  document.querySelector('.image-copyright').textContent =
    ' ' + nasaData.copyright + ' '
  document.querySelector('.image-title').textContent = ' ' + nasaData.title
  console.log(mainImage)
}

const getLaunchDetail = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )

  const shuttleDetails = await response.json()

  console.log(shuttleDetails)
  const details = shuttleDetails.details
  launchDate = shuttleDetails[counter].launch_date_utc.toString()
  if (shuttleDetails != null) {
    document.querySelector('.launch-info').textContent =
      shuttleDetails[counter].details
    document.querySelector('.mission-name').textContent =
      shuttleDetails[counter].mission_name
    document.querySelector('.location').textContent =
      shuttleDetails[counter].launch_site.site_name_long
    document.querySelector9('.countdown').textContent = shuttleDetails[
      counter
    ].launch_date_utc.toString()
  } else shuttleDetails.details
  document.querySelector('.launch-info').textContent =
    'No description available yet.'
}

//  launchDate = shuttleDetails[counter].launch_date_utc.toString()
//   if (details != null) {
//     document.querySelector('.countdown-area').textContent =
//       shuttleDetails[counter].details

const launchCountdown = endDate => {
  let days, hours, minutes, seconds

  endDate = new Date(launchDate)

  if (isNaN(endDate)) {
    return
  }

  const calculate = () => {
    let startDate = new Date()
    startDate = startDate.getTime()

    let timeRemaining = parseInt((endDate - startDate) / 10000)

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400)
      timeRemaining = timeRemaining % 86400

      hours = parseInt(timeRemaining / 3600)
      timeRemaining = timeRemaining % 3600

      minutes = parseInt(timeRemaining / 60)
      timeRemaining = timeRemaining % 60

      seconds = parseInt(timeRemaining)
      const daysLeft = { days, hours, minutes, seconds }

      document.querySelector('.days').textContent = days + ' Days '
      document.querySelector('.hours').textContent = hours + ' Hours '
      document.querySelector('.minutes').textContent = minutes + ' Minutes '
      document.querySelector('.seconds').textContent = seconds + ' Seconds '
    }
  }
  setInterval(calculate, 10000)
}

const displayLaunchData = () => {
  if (counter > 0 || counter <= 18) {
    return shuttleLaunchDetails[counter]
  } else {
    return counter
  }
}

const displayPreviousLaunchData = () => {
  let counter = counter - 1
  if (counter > 18) {
    return shuttleLaunchDetails[counter]
  } else {
    return shuttleLaunchDetails[counter]
  }
}

const nextLaunchDetail = () => {
  if (counter === shuttleLaunchDetails.length - 1) {
    counter = 0
  } else {
    counter++
  }
  getLaunchDetail()
}

const previousLaunchDetail = () => {
  if (counter === 0) {
    counter = shuttleLaunchDetails.length - 1
  } else {
    counter--
  }

  getLaunchDetail()
}

document.addEventListener('DOMContentLoaded', main)
document
  .querySelector('.right-arrow')
  .addEventListener('click', nextLaunchDetail)
document
  .querySelector('.left-arrow')
  .addEventListener('click', previousLaunchDetail)
