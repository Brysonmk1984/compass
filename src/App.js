import React from 'react';
import './assets/sass/styles.scss';

export default class App extends React.Component {
  testMethod() {
    console.log('dumb test2ss');
    console.log(eval('1+2'));
  }

  render() {
    this.testMethod();
    return <div>Thisss dsadsas</div>;
  }
}
