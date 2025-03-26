import React from 'react'
import Growth  from '../components/Growth/Growth'
import AllStocksTable from '../components/AllStocksTable'
import LoadingContainer from '../components/utils/LoadingContainer'

const Dashboard = () => {
  return (
    <div className='min-h-[85vh]'>
        <Growth/>
        <AllStocksTable/>
    </div>
  )
}

export default Dashboard