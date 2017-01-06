import React, { Component, PropTypes } from 'react';

import ItemHoc from 'Common/ItemHoc';

class Item extends Component {
  render() {
    return (
      <div className='item'>
        { this.props.title }
        { this.props.description }
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
