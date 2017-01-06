import React, { Component } from 'react';

import Link from 'react-router/lib/Link';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='container header__container'>
          <div className='logo'>
            <Link to='/' className='logo__link link'>React HN</Link>
          </div>
          <div className='menu'>
            <Link to='/newest' className='menu__link link'>new</Link>
            <span className='splitter'>|</span>
            <Link to='/ask' className='menu__link link'>ask</Link>
            <span className='splitter'>|</span>
            <Link to='/show' className='menu__link link'>show</Link>
            <span className='splitter'>|</span>
            <Link to='/job' className='menu__link link'>job</Link>
            <span className='splitter'>|</span>
            <a href='https://github.com/Golubkov-P/react-hn' className='menu__link link'>GITHUB</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
