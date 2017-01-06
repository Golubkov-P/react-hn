import React,  { Component, PropTypes } from 'react';

import HocItemPages from 'Common/HocItemPages';
import Item from './components/Item';

class ItemPage extends Component {
  render() {
    const { item } = this.props;

    return (
      <div>
        <Item item={item} />
      </div>
    );
  }
}

ItemPage.propTypes = {
  item: PropTypes.object.isRequired
};

export default HocItemPages('item')(ItemPage);
