import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Spinner from 'react-spinner-material';
//import Title from './Title';

export default class DialogWrapper extends React.Component {
  _createTweetList(list) {
    return list.map((tweet, i) => {
      let t = tweet.text;
      let url;

      if (t.includes('http')) {
        console.log('TWEE', tweet);
        t = t.split('http')[0];

        if (tweet.entities.urls.length) {
          const entity = tweet.entities.urls[0].url;
          url = (
            <a href={entity} target="_blank">
              {entity}
            </a>
          );
          return (
            <li key={i}>
              {t} {url}
            </li>
          );
        }
      }

      return <li key={i}>{t}</li>;
    });
  }

  render() {
    console.log('SP', this.props.selectedPerson);
    return (
      <Dialog
        title={`${this.props.selectedPerson.firstName} ${this.props.selectedPerson.lastName}`}
        actions={<FlatButton label="Close" primary={true} onClick={this.props.toggleModal} />}
        autoScrollBodyContent={true}
        modal={false}
        open={this.props.modalOpen}
        onRequestClose={() => this.props.toggleModal()}
      >
        <div id="twitterFeedContainer">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner size={120} spinnerColor={'#333'} spinnerWidth={2} visible={this.props.showSpinner} />
          </div>
          <div style={{ display: this.props.showSpinner ? 'none' : 'block' }}>
            <ul id="tweetList">{this._createTweetList(this.props.selectedPerson.tweets)}</ul>
          </div>
        </div>
      </Dialog>
    );
  }
}

DialogWrapper.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  selectedPerson: PropTypes.shape({
    handle: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tweets: PropTypes.array,
  }).isRequired,
};
