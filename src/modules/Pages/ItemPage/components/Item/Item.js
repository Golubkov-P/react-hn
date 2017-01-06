import React, { Component, PropTypes } from 'react';

import Comment from '../Comment';
import ItemHoc from 'Common/ItemHoc';

class Item extends Component {
  render() {
    const { item } = this.props;

    const renderComments = () => {
      return item.kids.map((id, indx) => {
        return <Comment key={indx} id={id} />;
      });
    };

    return (
      <div>
        <div className='item'>
          { this.props.title }
          { this.props.description }

          <div className='item__text'>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
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
  }),
  title: PropTypes.element.isRequired,
  description: PropTypes.element.isRequired
};

export default ItemHoc(Item);
