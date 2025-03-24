import React from 'react'

import growthData from '../data/StockIndexes/Growth'
import { GrowthItem } from './GrowthItem'



const Growth = () => {

  return (
    <div className='w-[100%]'>
        <div className="flex flex-col md:flex-row justify-between items-start md:space-x-6 space-y-4 md:space-y-0 pt-6 pb-6 bg-[#F5F6F7] ">
          {growthData.map((data, index) => (
              <GrowthItem
                  key={index}
                  title={data.title}
                  number={data.number}
                  growth={data.growth}
              />
          ))}
        </div>      
    </div>
  )
}

export default Growth;