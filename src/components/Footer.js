import React from 'react';

export default class Footer extends React.Component {
  _renderUsers() {
    return this.props.twitterUsers.map((person, i) => {
      return (
        <li key={i}>
          <button onClick={() => this.props.getUserTweets(person.handle)}>{person.handle}</button>
        </li>
      );
    });
  }

  render() {
    return <footer>{this._renderUsers()}</footer>;
  }
}
