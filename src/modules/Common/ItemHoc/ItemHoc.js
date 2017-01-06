import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import './ItemHoc.css';

const ItemHoc = (WrappedComponent) => {
  return class extends Component {
    static propTypes = {
      item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        descendants: PropTypes.number,
        title: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        score: PropTypes.number,
        url: PropTypes.string,
        by: PropTypes.string
      })
    }

    formatUrl(url) {
      return url
        .split(':')[1]
        .split('//')[1]
        .split('/')[0];
    }

    render() {
      const { item } = this.props;
      let title;

      if (item.url) {
        title = (
          <div className='item__title'>
            <a href={item.url} className='item__link'>{item.title}</a>
            <span className='item__host'>
              ({this.formatUrl(item.url)})
          </span>
          </div>
        );
      } else {
        title = (
          <div className='item__title'>
            <Link to={`/item/${item.id}`} className='item__link'>{item.title}</Link>
          </div>
        );
      }

      const description = (
        <div className='item__description'>
          Score: { item.score } points
          <span> | Autor: </span>
          <Link to={`/user/${item.by}`} className='item__user-link'>{ item.by }</Link>
          {
            item.descendants
              ? <span> | Comments: <Link to={`/item/${item.id}`} className='item__user-link'>{ item.descendants }</Link></span>
              : null
          }
          <span> | { moment(item.time, 'X').fromNow() }</span>
        </div>
      );

      return (
        <WrappedComponent {...this.props} title={title} description={description} />
      );
    }


  };
};

export default ItemHoc;
