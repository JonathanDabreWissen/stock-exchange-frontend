import React from 'react'
import { Growth } from '../components/Growth'
import StockTable from '../components/StockTable'

const Dashboard = () => {
  return (
    <div className='min-h-[85vh]'>
        <Growth/>
        <StockTable/>
    </div>
  )
}

export default Dashboard