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
import initiateHeroku from './services/initiateHeroku';

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
        resources: {},
      },
      modalOpen: false,
      classificationFilter: 'all',
    };
  }

  _getUserData(person) {
    let firstName = '';
    let lastName = '';
    let profileUrl = '';
    let resources = {};

    // Non twitter users
    if (!person.handle) {
      firstName = person.firstName;
      lastName = person.lastName;
      profileUrl = '';
      resources = person.resources;
      // twitter user
    } else {
      const matchingUser = this.state.twitterUsers.find(user => {
        return user.handle === person.handle;
      });
      this._getUserTweets(matchingUser);
      firstName = matchingUser.firstName;
      lastName = matchingUser.lastName;
      profileUrl = matchingUser.profileUrl;
      resources = matchingUser.resources;
    }

    this.setState(() => ({
      selectedPerson: Object.assign(this.state.selectedPerson, {
        firstName,
        lastName,
        profileUrl,
        resources,
      }),
    }));

    this._getWiki(firstName, lastName);
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

  _updateFilter(val) {
    this.setState(() => ({
      classificationFilter: val,
    }));
  }

  _determineSpinnerStatus() {
    if (this.state.selectedPerson.profileUrl) {
      return this.state.selectedPerson.tweets.length ? false : true;
    } else {
      return this.state.selectedPerson.wiki ? false : true;
    }
  }

  componentDidMount() {
    // Hit Heroku Server to spin up dyno immediately
    initiateHeroku();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header classificationFilter={this.state.classificationFilter} updateFilter={this._updateFilter.bind(this)} />
          <Compass
            classificationFilter={this.state.classificationFilter}
            getUserData={this._getUserData.bind(this)}
            historicalPeople={historicalPeople}
            twitterUsers={this.state.twitterUsers}
            historical={historicalPeople}
          />
          <Dialog
            disableTweets={this.state.selectedPerson.profileUrl === '' ? true : false}
            showSpinner={this._determineSpinnerStatus()}
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
