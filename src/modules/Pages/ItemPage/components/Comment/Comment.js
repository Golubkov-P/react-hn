import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';

import CommentChildren from './CommentChildren';
import CommentLoader from 'Common/CommentLoader';

import './Comment.css';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.state = {
      isOpen: true
    };

    this.handleOpening = this.handleOpening.bind(this);
  }

  handleOpening() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const { comment } = this.props;
    const hiddenClass = classNames({ hidden: !isOpen });

    let childrenComments;

    if (comment.kids) {
      childrenComments = (
        <CommentChildren
          kids={comment.kids}
          hiddenClass={hiddenClass}
        />
      );
    }

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

          <div className={`comment__body ${hiddenClass}`}>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          </div>
        </div>

        { childrenComments }

      </div>
    );
  }
}

export default CommentLoader(Comment);
