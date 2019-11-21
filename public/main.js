const getNasaSite = nasaSite => {
  const nasaApi = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  console.log(nasaApi)
  return nasaApi
}
const dailyImage = async nasaSite => {
  const response = await fetch(getNasaSite(nasaSite))
  const nasaData = await response.json()
  const mainImage = (document.querySelector(
    '.image-area'
  ).style.backgroundImage = "url('" + nasaData.hdUrl + "')")
  document.querySelector('.image-copyright').textContent =
    ' ' + nasaData.copyright + ' '
  document.querySelector('.image-title').textContent = ' ' + nasaData.title
  console.log(mainImage)
}
const getSpaceSite = spaceXSite => {
  const spaceApi =
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  console.log(spaceApi)
  return spaceApi
}
