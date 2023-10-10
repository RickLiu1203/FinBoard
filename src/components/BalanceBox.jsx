import React from 'react'

function BalanceBox(props) {

  return (
    <div className='flex flex-col items-center w-1/2 h-5/6 bg-white rounded-2xl shadow-xl px-8 pt-8 gap-2'>
      <h1 className='text-xl font-bold mb-2'>Account Balances</h1>
      {props.balances.map((account => (
        <div className='flex flex-col border-black border-b-[1px] gap-2 mt-2'>
          <div className='font-semibold'>{account.official_name}</div>
          <div className='text-gray-400 text-sm'>Available - ${account.balances.available} CAD</div>
          <div className='text-gray-400 text-sm pb-2'>Current - ${account.balances.current} CAD</div>
        </div>
      )))}
    </div>
  )
}

export default BalanceBox