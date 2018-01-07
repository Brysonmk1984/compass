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
        contentClassName={'modal-container'}
        title={`${this.props.selectedPerson.firstName} ${this.props.selectedPerson.lastName}`}
        actions={<FlatButton label="Close" primary={true} onClick={this.props.toggleModal} />}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
        modal={false}
        contentStyle={{ width: '100%', maxWidth: 'none' }}
        open={this.props.modalOpen}
        onRequestClose={() => this.props.toggleModal()}
      >
        <TabWrapper disableTweets={this.props.disableTweets} showSpinner={this.props.showSpinner} selectedPerson={this.props.selectedPerson} />
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
    resources: PropTypes.object.isRequired,
  }).isRequired,
  disableTweets: PropTypes.bool.isRequired,
};
