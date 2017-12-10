import React from 'react';
import Square from './Square';

export default class Compass extends React.Component {
  createGrid() {
    const gridArray = [];

    for (let i = 0; i < 2500; i++) {
      gridArray.push(<Square key={i} cellId={`${i}`} />);
    }
    console.log('grid', gridArray);
    return gridArray;
  }
  render() {
    return (
      <section>
        <div className="grid_wrapper">{this.createGrid()}</div>
      </section>
    );
  }
}
