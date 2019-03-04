import React from 'react'
import { AsyncStorage } from 'react-native'

export const storeItem = async (key, item) => {
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item))
    return jsonOfItem
  } catch (error) {
    console.log(error.message)
  }
}

export const retrieveItem = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key)
    const item = JSON.parse(retrievedItem)
    return item
  } catch (error) {
    console.log(error.message)
  }
  return
}

export const removeItem = async key => {
  try {
    var item = await AsyncStorage.removeItem(key)
    return item
  } catch (error) {
    console.log(error.message)
  }

  return
}
