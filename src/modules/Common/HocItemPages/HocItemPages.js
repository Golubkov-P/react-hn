import React, { Component, PropTypes } from 'react';

import Spinner from 'Common/Spinner';

import api from 'Api';

export default (itemType) => (ItemPageComponent) => {
  return class ItemPageWrapper extends Component {
    static propTypes = {
      params: PropTypes.object.isRequired
    }

    constructor() {
      super();

      this.state = {
        item: {},
        isLoading: true
      };
    }

    componentDidMount() {
      const { itemId } = this.props.params;

      api
        .getItem(itemType, itemId)
        .then(result => {
          if (result === null) {
            return;
          }

          this.setState({
            item: result,
            isLoading: false
          });
        });
    }

    render() {
      return (
        this.state.isLoading
          ? <Spinner />
          : <ItemPageComponent {...this.props} {...this.state} />
      );
    }
  };
};
