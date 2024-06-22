import { constants, paths } from '../apps'
export function getBearerToken(token: string) {
  return token ? `Bearer ${token}` : ''
}

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

export const removeDataAtLocalStorage = () => {
  localStorage.removeItem(constants.ACCESS_TOKEN_KEY)
  localStorage.removeItem(constants.REFRESH_TOKEN_KEY)
  localStorage.removeItem(constants.USER_ID_KEY)
}
