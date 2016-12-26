import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import moment from 'moment';

import './item.css';

class Item extends Component {

  formatUrl(url) {
    return url
            .split(':')[1]
            .split('//')[1]
            .split('/')[0];
  }

  render() {
    const { item } = this.props;

    return (
      <div className='item'>
        <div className='item__title'>
          <a href={item.url ? item.url : `/item/${item.id}`} className='item__link'>{ item.title }</a>
          {
            item.url
              ? (<span className='item__host'>
                  ({ this.formatUrl(item.url) })
                </span>)
              : null
          }
        </div>
        <div className='item__description'>
          Score: { item.score } points
          <span> | Autor: </span>
          <Link to={`/user/${item.by}`} className='item__user-link'>{ item.by }</Link>
          {
            item.descendants
              ? <span> | Comments: { item.descendants }</span>
              : null
          }
          <span> | { moment(item.time, 'X').fromNow() }</span>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    descendants: PropTypes.number,
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    score: PropTypes.number,
    url: PropTypes.string,
    by: PropTypes.string
  })
};

export default Item;
