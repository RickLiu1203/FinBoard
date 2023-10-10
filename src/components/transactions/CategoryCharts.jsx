import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import CatDonut from './CatDonut';

export default function CategoryCharts() {
  return (
    <div className="flex flex-col items-center w-1/2 h-5/6 bg-white rounded-2xl shadow-lg pt-8">
      <h1 className='text-xl font-bold mb-4'>Transactions by Category</h1>
      <CatDonut />
    </div>
  );
}
