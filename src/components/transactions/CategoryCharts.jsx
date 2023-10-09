import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import CatDonut from './CatDonut';

export default function CategoryCharts() {
  return (
    <div className="flex flex-col justify-center items-center w-96 h-fill bg-white rounded-2xl shadow-lg py-8">
      <h1 className='text-xl font-bold mb-4'>Transactions by Category</h1>
      <CatDonut />
    </div>
  );
}
