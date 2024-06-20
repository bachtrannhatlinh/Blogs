import { constants, paths } from '../apps'
// import { MAX_ID, MAX_TIME_ENERGY } from 'apps/constants'
// import dayjs from 'dayjs'
// import { ELeaseType, Horse, LENDING_STATUS, LENDING_TYPE } from 'models'
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'
// eslint-disable @typescript-eslint/no-explicit-any 
// export function ordinalSuffixOf(number: number): string {
//   const j = number % 10
//   const k = number % 100

//   if (j == 1 && k != 11) {
//     return number + 'st'
//   }

//   if (j == 2 && k != 12) {
//     return number + 'nd'
//   }

//   if (j == 3 && k != 13) {
//     return number + 'rd'
//   }

//   return number + 'th'
// }

// export const formatTime = (millis: number) => {
//   if (millis < 0) return '00:00:00'
//   const date = new Date(millis)
//   const seconds = date.getUTCSeconds()
//   const minutes = date.getUTCMinutes()
//   const hours = date.getUTCHours()
//   return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${
//     seconds < 10 ? '0' + seconds : seconds
//   }`
// }

// export const formatTimeMS = (millis: number) => {
//   if (millis < 0) return '00:00:00'
//   const date = new Date(millis)
//   const seconds = date.getUTCSeconds()
//   const minutes = date.getUTCMinutes()
//   return `${minutes + 'm'}:${seconds + 's'}`
// }

// export const formatTimeV2 = (millis: number, random = false) => {
//   if (millis < 0) return '00:00:00'
//   const date = new Date(millis)
//   const seconds = date.getUTCSeconds()
//   const minutes = date.getUTCMinutes()
//   const milliSeconds = random ? Math.floor(Math.random() * 99) + 1 : date.getMilliseconds() / 10
//   return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliSeconds}`
// }

// export const formatStatsRank = (statsRank: string) => {
//   return statsRank.replace('_PLUS', '+')
// }

export function getBearerToken(token: string) {
  return token ? `Bearer ${token}` : ''
}

// export function isObjectEmptyArray(candidate: any): candidate is [] {
//   if (!Array.isArray(candidate)) return false
//   if (candidate.length > 0) return false
//   return true
// }

export async function handleAsyncRequest<D>(promise: Promise<D>): Promise<[unknown, D?]> {
  const disableAccount = 'User account is disabled'
  const loggedAccount = 'Your account is currently logged onto another device'
  try {
    const data: D = await promise
    return [undefined, data]
  } catch (error: any) {
    if (error?.code === 403 || error?.code === -32002) {
      localStorage.setItem(constants.ACCESS_TOKEN_KEY, 'null')
      localStorage.setItem(constants.REFRESH_TOKEN_KEY, 'null')
      localStorage.setItem(constants.USER_ID_KEY, 'null')
    }
    if (error?.status === 401 && localStorage?.getItem(constants.ACCESS_TOKEN_KEY)) {
      removeDataAtLocalStorage()
    }

    if (error?.status === 401 && error?.error === disableAccount) {
      window.location.href = '/disable-account'
    }

    if (error?.status === 401 && error?.error === loggedAccount) {
      window.location.href = '/logged-account'
    }

    if (error?.code === 404) {
      window.location.href = paths.notFound.feature()
    }

    if (error.code === 503) {
      if (window.location.pathname !== paths.auth.login()) {
        window.location.href = '/maintenace'
      }
    }

    return [error, undefined]
  }
}

// export function removeCharacterEnd(text: string | undefined) {
//   if (!text || text === 'FreeStyle' || text === 'All' || text === 'TURF' || text === 'DIRT') {
//     return ''
//   }

//   return text.slice(0, -1)
// }

// export function capitalizeOnlyFirstLetter(text: string | undefined) {
//   if (!text) {
//     return ''
//   }

//   if (text === 'IQ') {
//     const firstLetter = text[0].toUpperCase()
//     const secondLetter = text[1].toUpperCase()
//     const theRestText = text.slice(2).toLowerCase()

//     return firstLetter + secondLetter + theRestText
//   }

//   const firstLetter = text[0].toUpperCase()
//   const theRestText = text.slice(1).toLowerCase()

//   return firstLetter + theRestText
// }

// export function getCurrentEnergyPercent(currentEnergy: number | null, maxEnergy: number | null) {
//   currentEnergy = currentEnergy || 0
//   maxEnergy = maxEnergy || 100

//   return Math.round((100 * currentEnergy) / maxEnergy)
// }

// export function getEnergyPercent(firstTime: number | null) {
//   firstTime = firstTime || 0
//   if (firstTime <= 0) {
//     return 100
//   } else return 100 - (firstTime * 100) / MAX_TIME_ENERGY
// }

// export function getNumberOfMailBox(lengthSeenRace: number, lengthSeenEvent: number, lengthSeenSystem: number) {
//   return lengthSeenRace + lengthSeenEvent + lengthSeenSystem
// }

// export function getNumberAllMailRead(lengthSeenRace: number, lengthSeenEvent: number, lengthSeenSystem: number) {
//   return lengthSeenRace + lengthSeenEvent + lengthSeenSystem
// }

// export function shortenRaceName(raceName?: string) {
//   if (!raceName) {
//     return ''
//   }

//   if (raceName.length > 17) {
//     raceName = `${raceName.slice(0, 14)}...`
//   }

//   return raceName
// }

// export function shortenUserName(name?: string) {
//   if (!name) {
//     return ''
//   }

//   if (name.length > 25) {
//     return `${name.slice(0, 6)}...${name.slice(-4)}`
//   }

//   return name
// }

// export function shortenRaceCourseNameClone(name?: string) {
//   if (!name) {
//     return ''
//   }

//   let newName = name

//   if (newName.length > 25) {
//     newName = `${newName.slice(0, 25)}...`
//   }
//   return newName
// }

// export function shortenRaceCourseName(name?: string) {
//   if (!name) {
//     return ''
//   }

//   let newName = name

//   if (newName.length > 20) {
//     newName = `${newName.slice(0, 15)}...`
//   }
//   return newName
// }

// export function shortenRaceMailTitle(name?: string) {
//   if (!name) {
//     return ''
//   }

//   let newName = name

//   if (newName.length > 20) {
//     newName = `${newName.slice(0, 20)}...`
//   }
//   return newName
// }

// export function shortenRaceMailContent(name?: string) {
//   if (!name) {
//     return ''
//   }

//   let newName = name

//   if (newName.length > 96) {
//     newName = `${newName.slice(0, 96)}...`
//   }
//   return newName
// }

// export function handleGroupingsOfThreeNumbers(value: number) {
//   return value
//     .toString()
//     .split(/(?=(?:\d{3})+(?:\.|$))/g)
//     .join(',')
// }

// export function numberWithCommas(n?: number | string) {
//   if (!n) return 0
//   const parts = n.toString().split('.')
//   return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '')
// }

// export function convertStringToNumber(value?: string) {
//   if (!value) {
//     return 0
//   }

//   return Number(value)
// }

// export const connectSocket = () => {
//   const link = configs.baseSocketUrl
//   return new Promise(function (resolve, reject) {
//     const stomp = Stomp.over(new SockJS(link)) as Stomp.Client
//     stomp.connect(
//       {},
//       () => {
//         resolve(stomp)
//       },
//       (err: Stomp.Frame | string) => {
//         reject(err)
//       }
//     )
//   })
// }

// export const isoDateFormat = (value: Date = new Date()) => {
//   return dayjs(value).toISOString()
// }

// export const checkFormatId = (_id: string) => {
//   if (isNaN(+_id) || parseInt(_id) > MAX_ID) {
//     window.location.href = paths.notFound.feature()
//   }
// }

export const removeDataAtLocalStorage = () => {
  localStorage.removeItem(constants.ACCESS_TOKEN_KEY)
  localStorage.removeItem(constants.REFRESH_TOKEN_KEY)
  localStorage.removeItem(constants.USER_ID_KEY)
}

// export const handeLeaseType = (value: string) => {
//   if (value === LENDING_TYPE.Available) return ELeaseType.Available
//   if (value === LENDING_TYPE.Share) return ELeaseType.Share
//   return ''
// }
// export const convert_status_lending = (status_lending: any): any => {
//   if (status_lending === 'IN_FARM') {
//     return LENDING_STATUS.InFarm
//   } else {
//     return status_lending
//   }
// }
// export const hanldeHorseOwnerName = (horse: Horse) => {
//   if (!horse) return
//   const chainAddress = horse?.chain_owner_address?.toLowerCase()
//   const publicAddress = horse?.user?.public_address?.toLowerCase()
//   const userName = horse?.user?.name

//   if (chainAddress && chainAddress === publicAddress) {
//     return userName ?? publicAddress
//   }
//   if (chainAddress && chainAddress !== publicAddress) {
//     return chainAddress
//   }
//   if (!chainAddress && !horse?.user) {
//     if (horse.own_status === 'LENDING') {
//       return 'LENDING'
//     } else return userName
//   } else return userName
// }
