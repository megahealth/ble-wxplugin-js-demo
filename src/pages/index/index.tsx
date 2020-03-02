import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { actionCreators as bleActionCreators } from "../../stores/store-ble";

import './index.scss'

// require plugin
const blePlugin = Taro.requirePlugin('megable');
const APPID = 'ZURNaXgbXw';
const APPKEY = '&e)CPKK?z;|p0V3';
const { initSdk } = blePlugin.ble;

class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页',
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }

  componentDidMount() {
    initSdk(APPID, APPKEY)
        .then(client => {
          console.log(client);
          this.props.handleInitClient(client);
        })
        .catch(err => console.error(err))
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const {
      device, handleGoScanPage,
      handleStart,
      handleStop,
      handleGetData,
      handleOpenRealTime,
      handleCloseRealTime,
      handleLiveOn,
      handleLiveOff,
      handleMonitorOn,
      handleMonitorOff,
      handleEnableRaw,
      handleDisableRaw,
    } = this.props

    return (
      <View>
        <View className='btn-block'>
          <Button onClick={handleGoScanPage}>去扫描页</Button>
        </View>

        <View>
          <View> <Text className='info-title'>Name:</Text> {device.name}</View>
          <View> <Text className='info-title'>Mac:</Text> {device.mac}</View>
          <View> <Text className='info-title'>SN:</Text> {device.sn}</View>
          <View> <Text className='info-title'>Fw:</Text> {device.fwVer}</View>
          <View> {device.otherInfo} </View>
        </View>

        {
          device.name ? (
            <View>
              <Button size='mini' onClick={handleOpenRealTime}>开实时通道</Button>
              <Button size='mini' onClick={handleCloseRealTime}>关实时通道</Button>
              <Button size='mini' onClick={handleLiveOn}>实时on</Button>
              <Button size='mini' onClick={handleLiveOff}>实时off</Button>
              <Button size='mini' onClick={handleMonitorOn}>监测on</Button>
              <Button size='mini' onClick={handleMonitorOff}>监测off</Button>
              <Button size='mini' onClick={handleGetData}>收数据</Button>
              <Button size='mini' onClick={handleEnableRaw}>开raw</Button>
              <Button size='mini' onClick={handleDisableRaw}>关raw</Button>
            </View>
          ) : null
        }
      </View>
    )
  }
}

const mapState = (state) => {
  return {
    num: state.index.num,
    device: state.ble.device,
    user: state.ble.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleGoScanPage() {
      Taro.navigateTo({ url: '/pages/scan/scan?name=dfs' })
    },
    handleExit() {
      bleActionCreators.clearAll()
    },
    handleStart() {
      bleActionCreators.start()
    },
    handleStop() {
      bleActionCreators.stop()
    },
    handleGetData() {
      bleActionCreators.getData()
    },
    handleUserExists(user) {
      dispatch(bleActionCreators.loginSuccess(user))
    },
    // ring normal
    handleOpenRealTime(){
      bleActionCreators.enableRealTime(true)
    },
    handleCloseRealTime(){
      bleActionCreators.enableRealTime(false)
    },
    handleLiveOn() {
      bleActionCreators.liveOn()
    },
    handleLiveOff() {
      bleActionCreators.liveOff()
    },
    handleMonitorOn() {
      bleActionCreators.monitorOn()
    },
    handleMonitorOff() {
      bleActionCreators.monitorOff()
    },
    handleEnableRaw() {
      bleActionCreators.enableRaw()
    },
    handleDisableRaw() {
      bleActionCreators.disableRaw()
    },
    handleInitClient(client) {
      bleActionCreators.initClient(client)
    }

  }
}

export default connect(mapState, mapDispatch)(Index)
