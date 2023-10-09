import React from 'react'
import Category from './CategoryIcon';

function TransactionBox(props) {
  return (
    <div className='flex w-11/12 max-w-screen-md max-h-96 bg-white rounded-2xl flex-col p-6 shadow-xl'>
        <h1 className='text-xl font-bold'>Transactions (24 Months)</h1>
        <table className='table-auto border-spacing-10'>
            <thead className='text-xs text-left font-bold'>
                <tr>
                    <th className='border-b border-black py-3 w-1/4'>Transaction Name</th>
                    <th className='border-b border-black ps-6 py-3 w-1/4'>Merchant</th>
                    <th className='border-b border-black ps-2 py-3 w-1/6'>Amount</th>
                    <th className='border-b border-black ps-2 py-3 w-1/6'>Date</th>
                    <th className='border-b border-black py-3 w-1/6'>Category</th>
                </tr>
            </thead>
        </table>
        <div className='overflow-scroll'>
        <table className='table-auto border-spacing-10'>
            <tbody className='text-xs text-left text-gray-500'>
                {props.transactions.map((item) => (
                    <tr key={item.transaction_id}>
                        <td className='border-b border-slate-200 py-3 w-1/4'>{item.name}</td>
                        <td className='border-b border-slate-200 ps-6 py-3 w-1/4'>{item.merchant_name}</td>
                        <td className='border-b border-slate-200 text-red-600 ps-2 py-3 w-1/6'>{(item.amount).toFixed(2)}</td>
                        <td className='border-b border-slate-200 ps-2 py-3 w-1/6'>{item.date}</td>
                        <td className='border-b border-slate-200 py-3 w-1/6'><Category category={item.category[0]}/></td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default TransactionBox;