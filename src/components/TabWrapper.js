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

  _displayResources() {
    const entries = Object.entries(this.props.selectedPerson.resources);
    return entries.map((item, i) => {
      return (
        <li key={i}>
          <a href={item[1]} target="_blank">
            {item[0]}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner size={120} spinnerColor={'#333'} spinnerWidth={2} visible={this.props.showSpinner} />
        </div>
        <div style={{ display: this.props.showSpinner ? 'none' : 'block' }}>
          <Tabs>
            <Tab style={{ display: this.props.disableTweets ? 'none' : 'block' }} label="Tweets">
              <div>
                <div id="twitterFeedContainer">
                  <ul id="tweetList">{this._createTweetList(this.props.selectedPerson.tweets)}</ul>
                </div>
              </div>
            </Tab>
            <Tab label="Wiki">{this._renderWiki(this.props.selectedPerson.wiki)}</Tab>
            <Tab label="Resources">
              <div>
                <ul>{this._displayResources()}</ul>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
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
