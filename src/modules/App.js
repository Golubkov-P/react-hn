import React, { Component, PropTypes } from 'react';

import Header from './components/Header';

import './App.css';

const propTypes = {
  children: PropTypes.element
};

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='app__container'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
