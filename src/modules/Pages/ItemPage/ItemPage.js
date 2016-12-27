import React,  { Component, PropTypes } from 'react';

import Item from './components/Item';

import api from '../../api';

class ItemPage extends Component {
  constructor() {
    super();
    this.state = {
      story: {}
    };
  }

  componentDidMount() {
    const { itemId } = this.props.params;

    api
      .getStory(itemId)
      .then(result => {
        if (result === null) {
          return;
        }

        this.setState({
          story: result
        });
      });
  }

  render() {
    const { story } = this.state;

    return (
      <div>
        { story.id ? <Item item={story} /> : null }
      </div>
    );
  }
}

ItemPage.propTypes = {
  params: PropTypes.shape({
    itemId: PropTypes.string.isRequired
  })
};

export default ItemPage;
