import React, { Component, PropTypes } from 'react';

import Comment from '../Comment';

class CommentChildren extends Component {
  static propTypes = {
    kids: PropTypes.array.isRequired,
    hiddenClass: PropTypes.string
  }

  render() {
    const { kids, hiddenClass } = this.props;

    return (<div className={`comment__children ${hiddenClass}`}>
      {
        kids.map((id, indx) => {
          return <Comment key={indx} id={id} />;
        })
      }
    </div>);
  }
}

export default CommentChildren;
