import React from 'react';
import './assets/sass/styles.scss';
import Nav from './components/Nav';
import Compass from './components/Compass';
import Footer from './components/Footer';
import twitterUsers from './assets/js/twitterUsers';
import { getUserTweets } from './services/getTweets';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      twitterUsers,
      selectedUserTweets: [],
    };
  }

  _getUserTweets(user) {
    getUserTweets(user).then(({ data }) => {
      this.setState(
        () => ({
          selectedUserTweets: data,
        }),
        () => {
          console.log('S', this.state.selectedUserTweets);
        },
      );
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <Compass />
        <Footer getUserTweets={this._getUserTweets.bind(this)} twitterUsers={this.state.twitterUsers} />
        <div>
          {this.state.selectedUserTweets.map((item, i) => {
            return <p key={i}>{item.text}</p>;
          })}
        </div>
      </div>
    );
  }
}
