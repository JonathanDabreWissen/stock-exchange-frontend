import React from 'react'
import Growth  from '../components/Growth/Growth'
import AllStocksTable from '../components/AllStocksTable'
import LoadingContainer from '../components/utils/LoadingContainer'
import SensexTracker from '../components/SensexTracker'

const Dashboard = () => {
  return (
    <div className='min-h-[85vh]'>
        <Growth/>
        <AllStocksTable/>
        {/* <SensexTracker/> */}
    </div>
  )
}

export default Dashboard