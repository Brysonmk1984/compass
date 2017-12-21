import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import Spinner from 'react-spinner-material';

export default class TabWrapper extends React.Component {
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

  _renderWiki(wiki) {
    if (wiki) {
      return (
        <div>
          <p>{wiki}</p>
        </div>
      );
    }
    return <div>Description unavailable</div>;
  }
  render() {
    return (
      <Tabs>
        <Tab label="Tweets">
          <div>
            <div id="twitterFeedContainer">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spinner size={120} spinnerColor={'#333'} spinnerWidth={2} visible={this.props.showSpinner} />
              </div>
              <div style={{ display: this.props.showSpinner ? 'none' : 'block' }}>
                <ul id="tweetList">{this._createTweetList(this.props.selectedPerson.tweets)}</ul>
              </div>
            </div>
          </div>
        </Tab>
        <Tab label="Wiki">{this._renderWiki(this.props.selectedPerson.wiki)}</Tab>
        <Tab label="Resources">
          <div>
            <p>This is a third example tab.</p>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

TabWrapper.propTypes = {
  showSpinner: PropTypes.bool.isRequired,
  selectedPerson: PropTypes.shape({
    handle: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tweets: PropTypes.array,
  }).isRequired,
};
