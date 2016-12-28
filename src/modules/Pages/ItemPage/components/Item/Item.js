import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import Comment from '../Comment';

import './Item.css';

class Item extends Component {
  formatUrl(url) {
    return url
            .split(':')[1]
            .split('//')[1]
            .split('/')[0];
  }

  render() {
    const { item } = this.props;

    const TitleWithUrl = () => {
      return (
        <div className='item__title'>
          <a href={item.url} className='item__link'>{item.title}</a>
          <span className='item__host'>
            ({this.formatUrl(item.url)})
          </span>
        </div>
      );
    };

    const TitleWithoutUrl = () => {
      return (
        <div className='item__title'>
          {item.title}
        </div>
      );
    };

    const createMarkup = () => {
      if (item.text) {
        return { __html: item.text };
      }
    };

    const renderComments = () => {
      return item.kids.map((id, indx) => {
        return <Comment key={indx} id={id} />;
      });
    };

    return (
      <div>
        <div className='item'>
          {
            item.url
              ? TitleWithUrl()
              : TitleWithoutUrl()
          }

          <div className='item__description'>
            Score: {item.score} points
            <span> | Autor: </span>
            <Link to={`/user/${item.by}`} className='item__user-link'>{item.by}</Link>
            <span> | { moment(item.time, 'X').fromNow() }</span>
          </div>
          <div className='item__text'>
            {item.text ? <div dangerouslySetInnerHTML={createMarkup()} /> : null}
          </div>
        </div>

        <div className='item__comment-stats'>
          Comments: {item.descendants}
        </div>

        { item.kids ? renderComments() : null }
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
