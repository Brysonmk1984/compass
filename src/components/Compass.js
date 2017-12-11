import React from 'react';
import Square from './Square';
import Person from './Person';

export default class Compass extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: this._createGrid(),
      people: [],

      modalOpen: false,
    };
  }
  _createGrid() {
    const gridArray = [];
    for (let i = 0; i < 2500; i++) {
      gridArray.push(<Square key={i} cellId={`${i}`} />);
    }
    return gridArray;
  }

  _createPeople() {
    console.log(this.props.twitterUsers);
    const allPeople = [...this.props.twitterUsers, ...this.props.historical];
    const people = allPeople.map((person, i) => {
      const { posX, posY } = this._determinePosition(person);

      return <Person key={i} posX={posX} posY={posY} person={person} getUserData={this.props.getUserData.bind(this)} />;
    });
    return people;
  }

  _determinePosition(p) {
    //Adjust for non-zero indexed grid
    const adjX = p.posX + 25;
    const adjY = p.posY < 0 ? Math.abs(p.posY) + 25 : 25 - p.posY;

    //Adjust to center image on point
    const posX = adjX - 1;
    const posY = adjY - 1;

    return { posX, posY };
  }

  render() {
    return (
      <section>
        <div className="grid_wrapper">
          {this.state.grid}
          {this._createPeople()}
        </div>
      </section>
    );
  }
}
