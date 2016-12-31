import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';

import api from 'Api';

import './Comment.css';

class Comment extends Component {
  constructor() {
    super();

    this.state = {
      comment: {},
      isOpen: true
    };

    this.handleOpening = this.handleOpening.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;

    api
      .getStory(id)
      .then(result => {
        if (result === null) return;

        this.setState({
          comment: result
        });
      });
  }

  handleOpening() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { comment, isOpen } = this.state;

    const commentChildrenClass = classNames('comment__children',
      { hidden: !isOpen }
    );

    const createMarkup = () => {
      if (comment.text) {
        return { __html: comment.text };
      }
    };

    const renderSubCommnets = () => {
      return comment.kids.map((id, indx) => {
        return <Comment key={indx} id={id} />;
      });
    };

    return (
      <div className='comment'>
        <div className='comment__wrapper'>
          <div className='comment__info'>
            <button
              onClick={this.handleOpening}
              type='button'
              className='comment__open'
            >
              [{isOpen ? '-' : '+'}]
            </button>

            <Link to={`user/${comment.by}`} className='comment__link'>
              {comment.by}
            </Link>

            <div className='comment__time'>
              {moment(comment.time, 'X').fromNow()}
            </div>
          </div>

          {isOpen && (
            <div className='comment__body'>
              { comment.text && <div dangerouslySetInnerHTML={createMarkup()} />}
            </div>
          )}
        </div>

        <div className={commentChildrenClass}>
          {comment.kids && renderSubCommnets()}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.number.isRequired
};

export default Comment;
