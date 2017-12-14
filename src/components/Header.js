import React from 'react';
import Headroom from 'react-headroom';

export default class Header extends React.Component {
  render() {
    return (
      <Headroom>
        <header>
          <h1>Socioeconomic Compass</h1>
        </header>
      </Headroom>
    );
  }
}
