import React from 'react'
import Growth  from '../components/Growth/Growth'
import AllStocksTable from '../components/AllStocksTable'
import LoadingContainer from '../components/utils/LoadingContainer'
import SensexTracker from '../components/SensexTracker'
import WebSocketComponent from '../components/WebSocketComponent'

const Dashboard = () => {
  return (
    <div className='min-h-[85vh]'>
        <Growth/>
        <AllStocksTable/>
        <WebSocketComponent/>
        {/* <SensexTracker/> */}
    </div>
  )
}

export default Dashboard