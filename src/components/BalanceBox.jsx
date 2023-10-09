import React from 'react'

function BalanceBox(props) {

  return (
    <div className='w-auto h-auto bg-white rounded-2xl shadow-xl px-8 py-6'>
      <h1>Account Balances</h1>
      {props.balances.map((account => (
        <>
          <div>{account.official_name}</div>
          <div>Available: ${account.balances.available} CAD</div>
          <div>Current: ${account.balances.current} CAD</div>
        </>
      )))}
    </div>
  )
}

export default BalanceBox