import React from 'react'
import { Permissions } from 'expo'

const cameraEnabled = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA
  )
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return false
  }

  return true
}

const cameraRollEnabled = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA_ROLL
  )
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return false
  }

  return true
}

export const registerForCamera = async () => {
  const enabled = await cameraEnabled()

  if (!enabled) {
    return Promise.resolve()
  }

  return Promise.resolve()
}

export const registerForCameraRoll = async () => {
  const enabled = await cameraRollEnabled()

  if (!enabled) {
    return Promise.resolve()
  }

  return Promise.resolve()
}
