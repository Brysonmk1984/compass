import React from 'react';

export default function Square(props) {
  return <div id={props.cellId} className={`grid_square grid_square_${props.cellId}`} />;
}
