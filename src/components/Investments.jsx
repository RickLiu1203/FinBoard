import React from 'react'
import Chart1 from './Chart1'

function Investments(props) {
  return (
    <div className='flex flex-col items-center w-1/3 h-full bg-white rounded-2xl shadow-xl px-8 py-6'>
        <h1 className='text-xl font-bold'>Investments</h1>
        <Chart1 />
        <h2 className='text-green-500'>${props.param.investments.value} | +{props.param.investments.change}% (6 Months)</h2>
    </div>
  )
}

export default Investments