export default {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_ID_KEY: 'user_id',
  HEROKU_BY_PASS: 'https://heroku-bypass.herokuapp.com/',
  DEBOUNCE_TIME: 500,
  HTTP_STATUS: {
    BAD_REQUEST: 400
  },
  TRANSACTION: 'transaction',
  SIGNER: 'signer',
  CLICKLOGIN: 'clickLogin'
}

export enum STATUS {
  WAITING = 'WAITING',
  SCHEDULING = 'SCHEDULING',
  LIVE = 'LIVE'
}

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm'

export const MAX_TIME_ENERGY = 54000000

export const MAX_ID = 2147483647

export const TIME_CLOSE_MODAL = 5000

export const TIME_CLOSE_STATS_MODAL = 2000

export const SPECTRE_RPC = '55'

export const SPEED_UP = 1.5

export const minInput = '0.00001'

export const maxInput = '9999999999.99999'

export const exceptThisSymbols = ['e', 'E', '+', '-', ',']

export const timeCheckNonce = 5000

export const decimalFormatCoin = 5

export const timeLineEndAt = 5000

export const optionPercent = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

export const MAX_HORSE_LEVEL = 20

export const TIME_NOTIFICATION = 20000

export const MailStatusOptions = [
  {
    name: 'All',
    isActive: true
  },
  {
    name: 'Read',
    isActive: false
  },
  {
    name: 'Unread',
    isActive: false
  }
]

export const MAX_PRICE_HTC = 1000000
export const TIME_CONFIGS = [
  { name: '1', day: '1', id: 1, active: false, value: '0' },
  { name: '3', day: '3', id: 2, active: false, value: '0' },
  { name: '7', day: '7', id: 3, active: false, value: '0' },
  { name: '15', day: '15', id: 4, active: false, value: '0' },
  { name: '30', day: '30', id: 5, active: false, value: '0' }
]
