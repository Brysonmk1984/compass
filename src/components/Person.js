import React from 'react';
import PropTypes from 'prop-types';

export default class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posX: props.posX,
      posY: props.posY,
    };
  }

  render() {
    var personStyles = {
      // + 1 to account for non-zero based grid lines, +3 to account for image area + gridline
      gridRow: `${this.state.posY + 1} / ${this.state.posY + 3}`,
      gridColumn: `${this.state.posX + 1} / ${this.state.posX + 3}`,
      backgroundImage: `url(${this.props.person.profileUrl})`,
      display: this.props.show ? 'block' : 'none',
    };
    return (
      <div
        className="grid_square_person"
        style={personStyles}
        onClick={() => this.props.getUserData(this.props.person)}
        data-balloon={`${this.props.person.firstName} ${this.props.person.lastName}`}
        data-balloon-pos="down"
      />
    );
  }
}

Person.propTypes = {
  getUserData: PropTypes.func.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  person: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    handle: PropTypes.string,
  }).isRequired,
};
