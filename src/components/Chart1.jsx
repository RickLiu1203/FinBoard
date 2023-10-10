import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import colors from 'tailwindcss/colors'

export default function Chart1() {
  const lineChartRef = useRef(null);

  useEffect(() => {
    const lineChartElement = lineChartRef.current;
    const lineChart = new Chart(lineChartElement, {
        type: 'line',
        data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                data: [81.59, 85.52, 94.76, 102.61, 107.9, 105.13],
                borderColor: "#4ade80"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            legend: false,
            
    }
  },
});

    return () => {
      lineChart.destroy();
    };
  }, []);

    return(
        <div className='w-full h-full'>
            <canvas ref={lineChartRef} />
        </div>
    );
}