import Taro from '@tarojs/taro'

import { constants } from "."

const defaultState = {
  devices: [],
  device: {},
  user: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.ACTION_DEVICES_FOUND:
      const foundDevices = [...state.devices]
      action.data.devices.forEach(device => {
        const idx = inArray(foundDevices, 'deviceId', device.deviceId)
        if (idx === -1) {
          foundDevices.push(device)
        } else {
          foundDevices[idx] = device
        }
      })
      return {
        ...state,
        devices: foundDevices
      }

    case constants.ACTION_CLEAR:
      return {
        ...state,
        devices: [],
      }

    case constants.ACTION_DEVICE_INFO:
      return {
        ...state,
        device: action.data ? {
          ...state.device,
          ...action.data,
        } : {}
      }

      case constants.ACTION_UPLOAD_SPT_DATA:
        const b64 = Taro.arrayBufferToBase64(new Uint8Array(action.data))
        console.log('monitor data received', b64.length);
        return state;

      case constants.ACTION_UPDATE_TOKEN:
        Taro.setStorage('token', action.data);
        return state;

      case constants.ACTION_LOGIN_SUCCESS:
        return {
          user: action.data
        }

      case constants.ACTION_LOGOUT:
        return {
          user: null
        }
        
      
    default:
      return state;
  }
}


const inArray = (arr, key, val) => {
  for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) return i
  }
  return -1
}
