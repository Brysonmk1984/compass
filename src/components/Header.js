import React from 'react';
import Headroom from 'react-headroom';
import Controls from './Controls';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  render() {
    return (
      <Headroom>
        <header>
          <h1>Socioeconomic Compass</h1>
          <Controls filter={this.props.classificationFilter} updateFilter={this.props.updateFilter} />
        </header>
      </Headroom>
    );
  }
}

Header.propTypes = {
  classificationFilter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
};
