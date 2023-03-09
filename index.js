const distro = 'Arch Linux'
const installDate = new Date('2023-02-11T15:10:01+0000')

const numPadding = (num) => (num > 0 && num < 10 ? `0${num}` : num)

class Difference {
  constructor(installDate) {
    this.installDate = new Date(installDate)
    this.now = new Date()
    this.diff = Math.round((this.now - this.installDate) / 1000)

    this.years = Math.floor(this.diff / (60 * 60 * 24 * 365))
    this.months = Math.floor((this.diff - this.years * (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30))
    this.days = Math.floor(
      (this.diff - (this.years * (60 * 60 * 24 * 365) + this.months * (60 * 60 * 24 * 30))) /
        (60 * 60 * 24)
    )
    this.hours = Math.floor(
      (this.diff -
        (this.years * (60 * 60 * 24 * 365) +
          this.months * (60 * 60 * 24 * 30) +
          this.days * (60 * 60 * 24))) /
        (60 * 60)
    )
    this.minutes = Math.floor(
      (this.diff -
        (this.years * (60 * 60 * 24 * 365) +
          this.months * (60 * 60 * 24 * 30) +
          this.days * (60 * 60 * 24) +
          this.hours * (60 * 60))) /
        60
    )
    this.seconds = Math.floor(
      this.diff -
        (this.years * (60 * 60 * 24 * 365) +
          this.months * (60 * 60 * 24 * 30) +
          this.days * (60 * 60 * 24) +
          this.hours * (60 * 60) +
          this.minutes * 60)
    )
  }

  inYears = () => this.years
  inMonths = () => this.months
  inDays = () => this.days
  inHours = () => this.hours
  inMinutes = () => this.minutes
  inSeconds = () => this.seconds
}

function formatBD(bd) {
  const date = new Intl.DateTimeFormat('default', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'America/Lima'
  }).format(bd)
  return date
}

const $app = document.getElementById('app')

const $installDate = document.createElement('div')
$app.appendChild($installDate)
$installDate.innerText = formatBD(installDate)

const $el = document.createElement('div')
$el.classList.add('el')
$app.appendChild($el)
$el.innerText = `Current distro: ${distro}`

const $diff = document.createElement('div')
$app.appendChild($diff)

const $years = document.createElement('span')
$years.classList.add('years')
$diff.appendChild($years)

const $months = document.createElement('span')
$months.classList.add('months')
$diff.appendChild($months)

const $days = document.createElement('span')
$days.classList.add('days')
$diff.appendChild($days)

const $hours = document.createElement('span')
$hours.classList.add('hours')
$diff.appendChild($hours)

const $minutes = document.createElement('span')
$minutes.classList.add('minutes')
$diff.appendChild($minutes)

const $seconds = document.createElement('span')
$seconds.classList.add('seconds')
$diff.appendChild($seconds)

const interval = setInterval(() => {
  const bd = new Difference(installDate)

  $years.innerText = `${bd.inYears()} years `
  $months.innerText = `${bd.inMonths()} months `
  $days.innerText = `${bd.inDays()} days `
  $hours.innerText = `${numPadding(bd.inHours())} hours `
  $minutes.innerText = `${numPadding(bd.inMinutes())} minutes `
  $seconds.innerText = `${numPadding(bd.inSeconds())} seconds`
}, 1000)
