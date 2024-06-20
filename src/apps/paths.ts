export default {
  default: () => '/',
  home: {
    feature: () => '*',
    help: () => '/help',
    terms: () => '/terms',
    privacy: () => '/privacy'
  },
  race: {
    feature: () => 'race/*',
    scheduledRaces: () => '/scheduled-races',
    open: () => '/open',
    detail: () => '/detail/:raceId',
    result: () => '/result'
  },
  auth: {
    feature: () => 'login/*',
    login: () => '/login'
  },
  horse: {
    feature: () => 'horse/*',
    detail: () => '/detail/:token_id',
    detailRaceView: () => '/detail/:token_id/race/:raceId'
  },
  profile: {
    feature: () => 'profile/*',
    balance: () => '/balance'
  },
  market: {
    feature: () => 'lending/*',
    market: () => '/market',
    myAsset: () => '/my-asset',
    myLending: () => '/my-lending',
    myBorrow: () => '/my-borrow',
    detail: () => '/detail/:token_id',
  },
  balance: {
    feature: () => 'balance/*'
  },
  maintenace: {
    feature: () => 'maintenace/*',
    detail: () => '/maintenace'
  },
  disableAccount: {
    feature: () => 'disable-account/*'
  },
  loggedAccount: {
    feature: () => '/logged-account'
  },
  notFound: {
    feature: () => '/page-not-found'
  },
  mobile: {
    feature: () => '/mobile'
  },
  test: {
    feature: () => '/test'
  },
  mailbox: {
    feature: () => 'mail-box/*',
    raceMail: () => '/race-mail',
    eventMail: () => '/event-mail',
    systemMail: () => '/system-mail'
  }
}
