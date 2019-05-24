import FirebaseKeys from 'src/api/FirebaseKeys.js'
import * as firebase from 'firebase'
import * as Constants from 'src/config/Constants'
import * as Secrets from 'src/config/Secrets'

export const decodeBlogTitle = str => {
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec)
  })
}

export const getBlogImage = item => {
  const media = item._embedded['wp:featuredmedia'][0]
  let image_url =
    'http://christchapel.live/wp-content/uploads/2018/08/jeremy-bishop-72608-unsplash-150x150.jpg'
  if ('media_details' in media) {
    image_url = media.media_details.sizes.full.source_url
  }

  return image_url
}

export const isAdmin = async (userName, callback) => {
  await firebase
    .database()
    .ref(`users/${userName}`)
    .once('value')
    .then(snapshot => {
      const isAdmin = (snapshot.val() && snapshot.val().isAdmin) || false
      callback(isAdmin)
    })
}

export const getMMSSFromMillis = millis => {
  const totalSeconds = millis / 1000
  const seconds = Math.floor(totalSeconds % 60)
  const minutes = Math.floor(totalSeconds / 60)

  const padWithZero = number => {
    const string = number.toString()
    if (number < 10) {
      return '0' + string
    }
    return string
  }

  return padWithZero(minutes) + ':' + padWithZero(seconds)
}

export const getMediaList = async mediaType => {
  var mediaList = []
  const dbPath = Constants.MEDIA_ROUTE

  await firebase
    .database()
    .ref(dbPath)
    .once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        var trackList = []

        if (
          childSnapshot.val().type === mediaType ||
          mediaType === Constants.MEDIA_TYPE.ALL
        ) {
          if (childSnapshot.val().tracks !== undefined) {
            trackEntries = Object.entries(childSnapshot.val().tracks)
            trackEntries.map((item, index) => {
              trackList.push({
                key: item[0],
                albumKey: childSnapshot.key,
                title: item[1].title,
                fileName: item[1].file_name,
                url: item[1].remote_url
              })
            })
          }

          var defaultCover =
            'https://firebasestorage.googleapis.com/v0/b/ccsh-dev.appspot.com/o/Media%20Images%2Fheadphone.png?alt=media&token=090c8e9a-df7f-429d-8ea5-14bb4bf08055'
          if (childSnapshot.val().cover) {
            defaultCover = childSnapshot.val().cover
          }
          mediaList.push({
            key: childSnapshot.key,
            cover: defaultCover,
            title: childSnapshot.val().title,
            type: childSnapshot.val().type,
            tracks: trackList
          })
        }
      })
    })

  return mediaList
}

const buildEmailBody = (from, to, cc, bcc, subject, fields, templateID) => {
  const personalizations = [{}]
  personalizations[0].to = to
  if (cc && cc.length > 0) {
    personalizations[0].cc = cc
  }
  if (bcc && bcc.length > 0) {
    personalizations[0].bcc = bcc
  }
  personalizations[0].dynamic_template_data = fields
  personalizations[0].dynamic_template_data.subject = subject

  return {
    personalizations,
    from: {
      name: from.name,
      email: from.email
    },
    template_id: templateID
  }
}

export const getEmailList = async (emailType, emailListType) => {
  var emailList = []
  const dbPath = Constants.FORM_EMAIL_ROUTE + emailType + '/' + emailListType

  await firebase
    .database()
    .ref(dbPath)
    .once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        emailList.push({
          name: childSnapshot.key,
          email: childSnapshot.val()
        })
      })
    })

  return emailList
}

export const sendFormEmail = (
  templateID,
  from,
  subject,
  to,
  cc = [],
  bcc = [],
  fields
) => {
  const emailBody = buildEmailBody(
    from,
    to,
    cc,
    bcc,
    subject,
    fields,
    templateID
  )

  fetch(Constants.SENDGRID_API, {
    method: 'POST',
    headers: {
      Authorization: Secrets.SENDGRID_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailBody)
  })
    // .then(response => {})
    .then(response => {
      if (response.status !== 202 && response.ok !== 'true') {
        console.log('Error sending email: ' + response)
        console.log(response)
        throw new Error('Error sending email: ', response)
      }
    })
    .catch(error => {
      console.log('Error sending email: ', error)
      console.log(error)
    })
}
