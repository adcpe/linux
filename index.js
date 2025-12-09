const distro = 'Arch Linux'
const installDate = new Date('2025-04-03T11:32:19-0500')

const numPadding = (num) => (num > 0 && num < 10 ? `0${num}` : num)

class Difference {
  constructor(installDate) {
    this.now = new Date()
    this.installDate = installDate

    this.years = this.now.getFullYear() - this.installDate.getFullYear()
    this.months = this.now.getMonth() - this.installDate.getMonth()
    this.days = this.now.getDate() - this.installDate.getDate()
    this.hours = this.now.getHours() - this.installDate.getHours()
    this.minutes = this.now.getMinutes() - this.installDate.getMinutes()
    this.seconds = this.now.getSeconds() - this.installDate.getSeconds()

    if (this.seconds < 0) {
      this.seconds += 60
      this.minutes--
    }
    if (this.minutes < 0) {
      this.minutes += 60
      this.hours--
    }
    if (this.hours < 0) {
      this.hours += 24
      this.days--
    }
    if (this.days < 0) {
      // days in the month before `now`
      const prevMonthDays = new Date(this.now.getFullYear(), this.now.getMonth(), 0).getDate()
      this.days += prevMonthDays
      this.months--
    }
    if (this.months < 0) {
      this.months += 12
      this.years--
    }
  }

  inYears = () => this.years
  inMonths = () => this.months
  inDays = () => this.days
  inHours = () => this.hours
  inMinutes = () => this.minutes
  inSeconds = () => this.seconds
}

function formatInstallationDate(installationDate) {
  return new Intl.DateTimeFormat('default', {
    dateStyle: 'full',
    timeStyle: 'full',
    timeZone: 'America/Lima',
  }).format(installationDate)
}

const $app = document.getElementById('app')

// create DOM elements
const $distro = document.createElement('section')
$distro.classList.add('distro')
$app.appendChild($distro)

const $distroLabel = document.createElement('h1')
$distroLabel.innerText = 'Linux distribution'
$distro.appendChild($distroLabel)

const $distroName = document.createElement('span')
$distroName.classList.add('distro-name')
$distro.appendChild($distroName)

const $installDate = document.createElement('section')
$installDate.classList.add('install-date')
$app.appendChild($installDate)

const $installDateLabel = document.createElement('h1')
$installDateLabel.innerText = 'Installation date'
$installDate.appendChild($installDateLabel)

const $installDateValue = document.createElement('span')
$installDateValue.classList.add('install-date-value')
$installDate.appendChild($installDateValue)

const $timeElapsed = document.createElement('section')
$timeElapsed.classList.add('time-elapsed')
$app.appendChild($timeElapsed)

const $timeElapsedLabel = document.createElement('h1')
$timeElapsedLabel.innerText = 'Time elapsed since installation'
$timeElapsed.appendChild($timeElapsedLabel)

const $years = document.createElement('span')
$years.classList.add('years')
$timeElapsed.appendChild($years)

const $months = document.createElement('span')
$months.classList.add('months')
$timeElapsed.appendChild($months)

const $days = document.createElement('span')
$days.classList.add('days')
$timeElapsed.appendChild($days)

const $hours = document.createElement('span')
$hours.classList.add('hours')
$timeElapsed.appendChild($hours)

const $minutes = document.createElement('span')
$minutes.classList.add('minutes')
$timeElapsed.appendChild($minutes)

const $seconds = document.createElement('span')
$seconds.classList.add('seconds')
$timeElapsed.appendChild($seconds)

// update function (runs immediately, then every second)
function updateElapsed() {
  const bd = new Difference(installDate)

  $distroName.innerText = distro
  $installDateValue.innerText = formatInstallationDate(installDate)

  $years.innerText = `${bd.inYears()} years, `
  $months.innerText = `${bd.inMonths()} months, `
  $days.innerText = `${bd.inDays()} days, `
  $hours.innerText = `${numPadding(bd.inHours())} hours, `
  $minutes.innerText = `${numPadding(bd.inMinutes())} minutes, `
  $seconds.innerText = `${numPadding(bd.inSeconds())} seconds`
}

document.addEventListener('DOMContentLoaded', () => {
  // run once immediately so content is ready in one paint
  updateElapsed()

  // reveal app (index.html has #app.preload to hide while computing)
  $app.classList.remove('preload')

  // keep ticking
  setInterval(updateElapsed, 1000)
})
