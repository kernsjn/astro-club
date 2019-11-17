function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i] != null ? arguments[i] : {}
    let ownKeys = Object.keys(source)
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable
        })
      )
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key])
    })
  }
  return target
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }
  return obj
}
function _classCallCheck(instance, letructor) {
  if (!(instance instanceof letructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    let descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}
function _createClass(letructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(letructor.prototype, protoProps)
  if (staticProps) _defineProperties(letructor, staticProps)
  return letructor
}
let API_URL = 'https://sdg-astro-api.herokuapp.com/api/'
let Launch = (function() {
  function Launch(item) {
    let _this = this
    _classCallCheck(this, Launch)
    this.data = _objectSpread({}, item)
    this.ICONS = {
      SHUTTLE: function SHUTTLE() {
        return _this.createIcon('space-shuttle')
      },
      DESCRIPTION: function DESCRIPTION() {
        return _this.createIcon('info-circle')
      },
      LOCATION: function LOCATION() {
        return _this.createIcon('map-marked-alt')
      },
      COUNTDOWN: function COUNTDOWN() {
        return _this.createIcon('clock')
      }
    }
  }
  _createClass(Launch, [
    {
      key: 'createIcon',
      value: function createIcon(icon) {
        let _icon = document.createElement('i')
        _icon.classList.add('fas')
        _icon.classList.add('fa-'.concat(icon))
        return _icon
      }
    },
    {
      key: 'createHeader',
      value: function createHeader() {
        let _missionName = document.createElement('h3')
        _missionName.appendChild(this.ICONS.SHUTTLE())
        _missionName.appendChild(
          document.createTextNode(this.data.mission_name)
        )
        return _missionName
      }
    },
    {
      key: 'createDescription',
      value: function createDescription() {
        let _missionMain = document.createElement('main')
        _missionMain.appendChild(this.ICONS.DESCRIPTION())
        if (this.data.details) {
          _missionMain.appendChild(document.createTextNode(this.data.details))
        } else {
          _missionMain.appendChild(
            document.createTextNode('No description available yet.')
          )
        }
        return _missionMain
      }
    },
    {
      key: 'createLocation',
      value: function createLocation() {
        let _missionLocation = document.createElement('section')
        _missionLocation.classList.add('location')
        _missionLocation.appendChild(this.ICONS.LOCATION())
        _missionLocation.appendChild(
          document.createTextNode(this.data.launch_site.site_name_long)
        )
        return _missionLocation
      }
    },
    {
      key: 'createCountDown',
      value: function createCountDown() {
        let _countdown = document.createElement('section')
        _countdown.classList.add('countdown')
        _countdown.appendChild(this.ICONS.COUNTDOWN())
        let now = new Date()
        let launchDate = new Date(this.data.launch_date_utc)
        let dif = launchDate.getTime() - now.getTime()
        let secondsFromT1ToT2 = dif / 1e3
        let totalSeconds = Math.abs(secondsFromT1ToT2)
        if (secondsFromT1ToT2 < 0) {
          _countdown.appendChild(document.createTextNode('Launched!'))
        } else {
          let time = { days: 0, hours: 0, minutes: 0, seconds: 0 }
          time.days = Math.floor(totalSeconds / (60 * 60 * 24))
          totalSeconds = totalSeconds - time.days * 24 * 60 * 60
          time.hours = Math.floor(totalSeconds / (60 * 60))
          totalSeconds = totalSeconds - time.hours * 60 * 60
          time.minutes = Math.floor(totalSeconds / 60)
          totalSeconds = totalSeconds - time.minutes * 60
          time.seconds = Math.floor(totalSeconds)
          _countdown.appendChild(
            document.createTextNode(
              ''
                .concat(time.days, ' days, ')
                .concat(time.hours, ' hours, ')
                .concat(time.minutes, ' mins, ')
                .concat(time.seconds, ' seconds')
            )
          )
        }
        return _countdown
      }
    },
    {
      key: 'renderCard',
      value: function renderCard() {
        let _parent = document.createElement('div')
        _parent.classList.add('card-parent')
        _parent.appendChild(this.createHeader())
        _parent.appendChild(this.createDescription())
        _parent.appendChild(this.createCountDown())
        _parent.appendChild(this.createLocation())
        return _parent
      }
    }
  ])
  return Launch
})()
let Page = (function() {
  function Page() {
    _classCallCheck(this, Page)
    this.state = {
      launches: { upcoming: [], currentIndex: 0, countdown: null },
      pictureOfTheDay: { url: '', title: 'loading...', copyright: 'loading...' }
    }
  }
  _createClass(Page, [
    {
      key: 'pageWillLoad',
      value: function pageWillLoad() {
        // this.loadImageOfTheDay()
        this.loadUpcomingLaunches()
      }
    },
    {
      key: 'loadUpcomingLaunches',
      value: function loadUpcomingLaunches() {
        let _this2 = this
        fetch(''.concat(API_URL, 'spacex/launches/upcoming'))
          .then(function(resp) {
            return resp.json()
          })
          .then(function(json) {
            _this2.updateUpcomingLaunches(json)
            _this2.renderPage()
          })
      }
    },
    {
      key: 'updateUpcomingLaunches',
      value: function updateUpcomingLaunches(json) {
        this.state.launches.upcoming = json.map(function(l) {
          return new Launch(l)
        })
      }
    },

    {
      key: 'renderUpcomingLaunches',
      value: function renderUpcomingLaunches() {
        let _launch = this.state.launches.upcoming[
          this.state.launches.currentIndex
        ]
        let _parent = document.querySelector('.launch-card')
        _parent.textContent = ''
        _parent.appendChild(_launch.renderCard())
        this.startCountDown()
      }
    },
    {
      key: 'startCountDown',
      value: function startCountDown() {
        let _this4 = this
        clearInterval(this.state.launches.countdown)
        this.state.launches.countdown = setTimeout(function() {
          _this4.renderUpcomingLaunches(_this4.state.launches.currentIndex)
        }, 1e3)
      }
    },
    {
      key: 'goToNextLaunch',
      value: function goToNextLaunch() {
        this.state.launches.currentIndex++
        if (
          this.state.launches.currentIndex + 1 >
          this.state.launches.upcoming.length
        ) {
          this.state.launches.currentIndex = 0
        }
        this.renderUpcomingLaunches()
      }
    },
    {
      key: 'goToPrevLaunch',
      value: function goToPrevLaunch() {
        this.state.launches.currentIndex--
        if (this.state.launches.currentIndex < 0) {
          this.state.launches.currentIndex =
            this.state.launches.upcoming.length - 1
        }
        this.renderUpcomingLaunches()
      }
    },
    {
      key: 'renderPage',
      value: function renderPage() {
        // this.renderPictureOfTheDay()
        this.renderUpcomingLaunches()
      }
    }
  ])
  return Page
})()
let page = new Page()
document.addEventListener('DOMContentLoaded', function() {
  return page.pageWillLoad()
})
document.querySelector('.left.arrow').addEventListener('click', function() {
  return page.goToPrevLaunch()
})
document.querySelector('.right.arrow').addEventListener('click', function() {
  return page.goToNextLaunch()
})

let main = () => {
  changePicture()
}

let changePicture = async () => {
  let response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  let json = await response.json()
  console.log(json)
  document.querySelector(
    'section.daily-picture'
  ).style.backgroundImage = `url(${json.hdUrl})`
  console.log(json.hdUrl)
  if (json.copyright) {
    document.querySelector('.copyright').textContent = json.copyright
  } else {
    document.querySelector('.copyright').textContent = 'no copyright'
  }
  document.querySelector('.title').textContent = json.title
}

let getCurrentSpaceXInfo = async () => {
  let response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )
  let results = await response.json()
  console.log(results)
  missions = results
  console.log(missions)
  currentMissionInfo()
}

document.addEventListener('DOMContentLoaded', main)
