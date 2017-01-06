import React, { Component, PropTypes } from 'react';

import api from 'Api';

import './CommentLoader.css';

const CommentLoader = (WrappedComment) => {
  return class extends Component {
    static propTypes = {
      id: PropTypes.number.isRequired
    }

    constructor() {
      super();

      this.state = {
        comment: {},
        isLoading: true
      };
    }

    componentDidMount() {
      const { id } = this.props;

      api
        .getItem('item', id)
        .then(result => {
          if (result === null) return;

          this.setState({
            comment: result,
            isLoading: false
          });
        });
    }

    render() {
      const { isLoading, comment } = this.state;
      let child;

      const loader = (
        <div className='loader'>
          <div className='rect1'/>
          <div className='rect2'/>
          <div className='rect3'/>
          <div className='rect4'/>
          <div className='rect5'/>
        </div>
      );

      if (isLoading) {
        child = loader;
      } else if (comment.deleted) {
        child = (
          <div className='comment'>
            <div className='comment__wrapper'>
              <span className='comment__deleted'>sorry, comment with id #{comment.id} was been deleted</span>
            </div>
          </div>
        );
      } else {
        child = <WrappedComment {...this.state} />;
      }

      return <div>{ child }</div>;
    }
  };
};

export default CommentLoader;
