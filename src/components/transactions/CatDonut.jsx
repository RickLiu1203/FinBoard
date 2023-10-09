import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import colors from 'tailwindcss/colors'

export default function CatDonut() {
  const donutChartRef = useRef(null);

  useEffect(() => {
    const donutChartElement = donutChartRef.current;
    const donutChart = new Chart(donutChartElement, {
      type: 'doughnut',
      data: {
        labels: ['Food and Drink', 'Payment', 'Transfer', 'Travel'],
        datasets: [
          {
            data: [2553.85, 25, 4.22, 12786.92],
            backgroundColor: [colors.orange[200], colors.blue[200], colors.gray[200], colors.green[200]],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
        },
        tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.dataset.data[context.dataIndex];
                const total = context.dataset.data.reduce(
                  (acc, curr) => acc + curr,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(2);
                return `${percentage}%`;
              },
            },
          },
      },
    });

    return () => {
      donutChart.destroy();
    };
  }, []);

    return(
        <div className='w-48 h-48'>
            <canvas ref={donutChartRef} />
        </div>
    );
}