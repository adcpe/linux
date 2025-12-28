const distro = 'Arch Linux'
const installDate = new Date('2025-12-27T16:57:23-0500')

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
const $distroName = document.querySelector('[data-distro]')
const $installDateValue = document.querySelector('[data-install-date]')
const $years = document.querySelector('[data-years]')
const $months = document.querySelector('[data-months]')
const $days = document.querySelector('[data-days]')
const $hours = document.querySelector('[data-hours]')
const $minutes = document.querySelector('[data-minutes]')
const $seconds = document.querySelector('[data-seconds]')
const $themeSelect = document.getElementById('theme-select')

const THEME_STORAGE_KEY = 'linux-theme'
const DEFAULT_THEME = 'gruvbox'

function applyTheme(theme) {
  const nextTheme = theme || DEFAULT_THEME
  document.documentElement.setAttribute('data-theme', nextTheme)
  if ($themeSelect) {
    $themeSelect.value = nextTheme
  }
}

function updateElapsed() {
  const bd = new Difference(installDate)

  $distroName.innerText = distro
  $installDateValue.innerText = formatInstallationDate(installDate)

  $years.innerText = bd.inYears()
  $months.innerText = bd.inMonths()
  $days.innerText = bd.inDays()
  $hours.innerText = numPadding(bd.inHours())
  $minutes.innerText = numPadding(bd.inMinutes())
  $seconds.innerText = numPadding(bd.inSeconds())
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  applyTheme(savedTheme)
  if ($themeSelect) {
    $themeSelect.addEventListener('change', (event) => {
      const { value } = event.target
      localStorage.setItem(THEME_STORAGE_KEY, value)
      applyTheme(value)
    })
  }

  updateElapsed()
  $app.classList.add('is-ready')
  setInterval(updateElapsed, 1000)
})
