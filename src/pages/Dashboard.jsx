import React from 'react'
import { Growth } from '../components/Growth'
import StockTable from '../components/WatchListTable'
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