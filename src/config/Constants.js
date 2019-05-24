import { FileSystem } from 'expo'

export const IMAGE_PATH = 'src/assets/images/'
export const LOGO_IMAGE = IMAGE_PATH + 'ccsh_logo.png'
export const LOGO_IMAGE_DARK = IMAGE_PATH + 'ccsh_logo_dk.png'
export const BLOG_INITIAL_PAGE = 1
export const BLOG_PER_PAGE = 10
export const BLOG_BASE_URL =
  'https://christchapel.live/wp-json/wp/v2/posts?_embed'
export const EVENT_INITIAL_PAGE = 1
export const EVENT_PER_PAGE = 10
export const EVENT_URL =
  'http://christchapel.live/wp-json/tribe/events/v1/events?_embed'
export const GIVE_URL = 'https://christchapelspringhill.churchcenter.com/giving'
export const SERMON_AUDIO_URL =
  'http://podcasts.subsplash.com/bafc678/podcast.rss'
export const IMAGE_CACHE_LOC = `${FileSystem.cacheDirectory}ccimages/`

export const NOTIFICATION_MINUTES_BEFORE_EVENT = 30
export const DAY_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
}
export const NEW_BLOG_DAY = DAY_OF_WEEK.WEDNESDAY

export const SERVICE_TIMES = {
  UNKNOWN: 0,
  SUNDAY_AM_FIRST: 1,
  SUNDAY_AM_SECOND: 2
}

export const GUEST_TYPE = {
  UNKNOWN: 0,
  NEW_VISITOR: 1,
  REPEAT_VISITOR: 2,
  FULL_TIME: 3,
  MEMBER: 4,
  ADMINISTRATOR: 5,
  SUPER_ADMINISTRATOR: 6
}

export const MARKETING_TYPE = {
  UNKNOWN: 0,
  WORD_OF_MOUTH: 1,
  SIGN: 2,
  ONLINE_SOCIAL_MEDIA: 3,
  OTHER: 4
}

export const MEDIA_TYPE = {
  UNKNOWN: 'unknown',
  ALL: 'all',
  MUSIC: 'music'
}

// Regular Expression Patterns
export const REG_EXP_PHONE = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

// SendGrid E-Mail related constants
export const FROM_EMAIL = {
  name: 'Christ Chapel',
  email: 'no-reply@christchapel.live'
}
export const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'
export const CONTACT_US_TEMPLATE_ID = 'd-1e6a55b6280a470d8b6a6967926bac6c'
export const COMMGROUP_SIGNUP_TEMPLATE_ID = 'd-6ccdae3373184e53944b4e6e39639651'
export const PRAYER_REQUEST_TEMPLATE_ID = 'd-9aa52458f80547bc8beaccd2e5a69383'
export const NEXT_STEPS_TEMPLATE_ID = 'd-3770e9fbc4f744f1a939663352540b74'

export const MAIN_SCREEN_ROUTE = 'admin/configuration/mainScreen/'
export const FORM_EMAIL_ROUTE = 'admin/configuration/forms/'
export const MEDIA_ROUTE = 'admin/configuration/media/'
