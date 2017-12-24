import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './assets/sass/styles.scss';
import Header from './components/Header';
import Compass from './components/Compass';
import Dialog from './components/Dialog';
import Footer from './components/Footer';
import { twitterUsers, historicalPeople } from './assets/js/users';
import { getUserTweets } from './services/getTweets';
import { getWiki } from './services/getWiki';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      twitterUsers,
      selectedPerson: {
        firstName: '',
        lastName: '',
        handle: '',
        profileUrl: '',
        tweets: [],
        wiki: '',
      },
      modalOpen: false,
    };
  }

  _getUserData(handle) {
    if (!handle) {
      return;
    }
    const matchingUser = this.state.twitterUsers.find(user => {
      return user.handle === handle;
    });
    this.setState(() => ({
      selectedPerson: Object.assign(this.state.selectedPerson, {
        firstName: matchingUser.firstName,
        lastName: matchingUser.lastName,
        profileUrl: matchingUser.profileUrl,
      }),
    }));

    this._getUserTweets(matchingUser);
    this._getWiki(matchingUser.firstName, matchingUser.lastName);
    this._toggleModal();
  }

  _getUserTweets(user) {
    getUserTweets(user.handle).then(({ data }) => {
      if (data) {
        this.setState(() => ({
          selectedPerson: Object.assign(this.state.selectedPerson, { tweets: data }),
        }));
      }
    });
  }

  _getWiki(firstName, lastName) {
    function strip(html) {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }

    getWiki(firstName, lastName).then(({ data }) => {
      this.setState(() => ({
        selectedPerson: Object.assign(this.state.selectedPerson, { wiki: strip(data) }),
      }));
    });
  }

  _toggleModal() {
    const modalOpen = this.state.modalOpen;

    const newState = modalOpen
      ? {
          modalOpen: false,
          selectedPerson: {
            firstName: '',
            lastName: '',
            handle: '',
            tweets: [],
          },
        }
      : { modalOpen: true };

    this.setState(() => newState);
  }

  componentDidMount() {
    this._getWiki('Abby', 'Martin');
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Compass getUserData={this._getUserData.bind(this)} historicalPeople={historicalPeople} twitterUsers={this.state.twitterUsers} historical={historicalPeople} />
          <Dialog
            showSpinner={this.state.selectedPerson.tweets.length ? false : true}
            selectedPerson={this.state.selectedPerson}
            toggleModal={this._toggleModal.bind(this)}
            modalOpen={this.state.modalOpen}
          />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}
