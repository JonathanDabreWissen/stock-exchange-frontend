import React from 'react'
import Growth  from '../components/Growth'
import AllStocksTable from '../components/AllStocksTable'

const Dashboard = () => {
  return (
    <div className='min-h-[85vh]'>
        <Growth/>
        <AllStocksTable/>
    </div>
  )
}

export default Dashboard