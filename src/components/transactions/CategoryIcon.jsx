import React from 'react';

function Category(props) {
  const categoryColors = {
    'Food and Drink': 'bg-orange-100 text-orange-400 border-orange-400 border',
    'Travel': 'bg-green-100 text-green-400 border-green-400 border',
    'Payment': 'bg-blue-100 text-blue-400 border-blue-400 border',
    'Transfer': 'bg-gray-100 text-gray-400 border-gray-400 border'
  };

  const categoryColor = categoryColors[props.category];

  return (
    <div className={`flex justify-center rounded-xl w-fit px-3 py-1 font-semibold ${categoryColor}`}>
      {props.category}
    </div>
  );
}

export default Category;
