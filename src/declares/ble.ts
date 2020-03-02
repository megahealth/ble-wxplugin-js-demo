interface BleClient {
  callback: any

  setCallback: Function
  connect: Function
  startWithToken: Function
  disconnect: Function

  enableMonitorV1: Function
  syncData: Function
  enableRealTimeNotify: Function
  enableLive: Function
  enableMonitor: Function
  enableRawdata: Function
  disableRawdata: Function
  setUserInfo: Function
}

interface BleScanner {
  isScanning: boolean
  initBleAdapter: Function
  scan: Function
  stopScan: Function
}