import { FileSystem, ImageManipulator } from 'expo'

import * as Constants from 'src/config/Constants'
import * as actionTypes from 'src/actions/actionTypes'

_getFileNameFromURI = uri => {
  if (uri === null) {
    return ''
  }

  return uri
    .split('#')
    .shift()
    .split('?')
    .shift()
    .split('/')
    .pop()
}

const _splitFileName = fileName => {
  return fileName.split('.')
}

_getLocalFileNamePath = fileName => {
  return `${Constants.IMAGE_CACHE_LOC + fileName}`
}

_removeCache = async uri => {
  await FileSystem.deleteAsync(uri, {
    idempotent: true
  })
}

_fileTooOld = (fileName, ttl) => {
  FileSystem.getInfoAsync(fileName)
    .then(opts => {
      if (opts.exists) {
        const ttlSeconds = ttl * 24 * 60 * 60
        var startDate = newDate(0)
        startDate.setUTCSeconds(opts.modificationTime)
        var endDate = new Date()
        var cacheAge = (endDate.getTime() - startDate.getTime()) / 1000

        if (ttl !== 0 && cacheAge > ttlSeconds) {
          _removeCache(opts.uri)
          return true
        } else {
          return false
        }
      }
    })
    .catch(e => {
      console.log('Error getting file info: ', e)
      return true
    })
}

_generateThumbnail = async localUri => {
  const _fileName = _splitFileName(_getFileNameFromURI(localUri))
  const _thumbnailID = '-thumb.png'

  await ImageManipulator.manipulateAsync(
    localUri,
    [{ resize: { width: 50 } }],
    { compress: 0, format: 'png' }
  )
    .then(generatedThumbnail => {
      FileSystem.moveAsync({
        from: generatedThumbnail.uri,
        to: _getLocalFileNamePath(`${_fileName[0] + _thumbnailID}`)
      }).catch(e => {
        console.log('Move Thumbnail Failed: ', e)
      })
    })
    .catch(e => {
      console.log('Error generating thumbnail: ', e)
    })
}

export const cacheImageFetch = payload => {
  return (dispatch, getState) => {
    if (!getState().cacheImageReducer.imageLoading.includes(payload.uri)) {
      if (!(payload.uri in getState().cacheImageReducer.imageCache)) {
        const downloadTimestamp = new Date().getTime()
        const localFile =
          downloadTimestamp + '_' + _getFileNameFromURI(payload.uri)
        const localFilePath = _getLocalFileNamePath(localFile)

        if (!_fileTooOld(localFilePath, payload.ttl)) {
          dispatch(cacheImageDownload(payload.uri))

          FileSystem.downloadAsync(payload.uri, localFilePath)
            .then(downloaded => {
              if (downloaded.status === 200) {
                dispatch(
                  cacheImageSuccess(payload.uri, localFile)
                  // cacheImageSuccess(payload.uri, localFile)
                )
                // generate thumbnail
                _generateThumbnail(localFilePath)
              } else {
                dispatch(cacheImageError(payload.uri))
              }
            })
            .catch(e => {
              dispatch(cacheImageError(payload.uri))
            })
        }
      }
    }
  }
}

export const cacheImageDownload = uri => {
  return {
    type: actionTypes.CACHE_IMAGE_DOWNLOAD,
    uri
  }
}

export const cacheImageSuccess = (uri, localFile) => {
  return {
    type: actionTypes.CACHE_IMAGE_SUCCESS,
    uri,
    localFile
  }
}
export const cacheImageError = uri => {
  return {
    type: actionTypes.CACHE_IMAGE_ERROR,
    uri
  }
}

export const cacheImageClear = () => {
  return {
    type: actionTypes.CACHE_IMAGE_CLEAR
  }
}
