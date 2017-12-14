import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import TabWrapper from './TabWrapper';
//import Title from './Title';

export default class DialogWrapper extends React.Component {
  render() {
    return (
      <Dialog
        title={`${this.props.selectedPerson.firstName} ${this.props.selectedPerson.lastName}`}
        actions={<FlatButton label="Close" primary={true} onClick={this.props.toggleModal} />}
        autoScrollBodyContent={true}
        modal={false}
        open={this.props.modalOpen}
        onRequestClose={() => this.props.toggleModal()}
      >
        <TabWrapper showSpinner={this.props.showSpinner} selectedPerson={this.props.selectedPerson} />
      </Dialog>
    );
  }
}

DialogWrapper.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  selectedPerson: PropTypes.shape({
    handle: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tweets: PropTypes.array,
  }).isRequired,
};
