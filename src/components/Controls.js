import React from 'react';
import PropTypes from 'prop-types';

export default class Controls extends React.Component {
  render() {
    return (
      <select value={this.props.filter} selected={this.props.filter} onChange={e => this.props.updateFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="altMedia">Alternative Media</option>
        <option value="mainstreamMedia">Mainstream Media</option>
        <option value="moneySpender">Money Spender</option>
        <option value="politician">Politician</option>
        <option value="pundit">Pundit</option>
      </select>
    );
  }
}

Controls.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
};
