import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Controls extends React.Component {
  render() {
    return (
      <div id="controlsContainer">
        <SelectField
          floatingLabelText="Filter:"
          value={this.props.filter}
          onChange={(event, index, response) => {
            this.props.updateFilter(response);
          }}
        >
          <MenuItem value={'all'} primaryText="All" />
          <MenuItem value={'altMedia'} primaryText="Alternative Media" />
          <MenuItem value={'mainstreamMedia'} primaryText="Mainstream Media" />
          <MenuItem value={'moneySpender'} primaryText="Money Spender" />
          <MenuItem value={'politician'} primaryText="Politician" />
          <MenuItem value={'pundit'} primaryText="Pundit" />
          <MenuItem value={'other'} primaryText="Other" />
        </SelectField>
      </div>
    );
  }
}

Controls.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
};
