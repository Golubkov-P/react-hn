import React, { Component, PropTypes } from 'react';

import HocPage from 'Common/HocPage';

import Item from 'Common/Item';

class ShowPage extends Component {
  render() {
    let { items } = this.props;

    items = items.map((item, indx) => {
      return <Item key={indx} item={item} />;
    });

    return (
      <div>
        { items }
      </div>
    );
  }
}

ShowPage.propTypes = {
  items: PropTypes.array.isRequired
};

export default HocPage('showstories')(ShowPage);
