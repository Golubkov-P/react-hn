import React, { Component } from 'react';

import Spinner from 'Common/Spinner';

import api from 'Api';

export default (apiString) => (WrappedPage) => {
  return class HocPage extends Component {
    constructor() {
      super();
      this.state = {
        items: [],
        isLoading: true,
        isLoadMore: false
      };

      this.pagination = 0;

      this.loadItem = this.loadItem.bind(this);
      this.loadItemsList = this.loadItemsList.bind(this);
      this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
      this.loadItemsList('isLoading');
      window.addEventListener('scroll', this.loadMore);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.loadMore);
    }

    loadItemsList(loadType) {
      const startIndex = this.pagination;

      this.pagination = this.pagination + 10;

      api.getStoriesList(apiString)
        .then(result => {
          for (let i = startIndex; i <= this.pagination; i++) {
            if (i === this.pagination) {
              this.setState({
                [loadType]: false
              });
              return;
            }

            this.loadItem(result[i]);
          }
        });
    }

    loadItem(id) {
      if (id === undefined) return;

      const newItem = [];

      api.getItem('item', id)
        .then(result => {
          if (result === null) {
            return;
          }

          newItem.push(result);
          this.setState({
            items: this.state.items.concat(newItem)
          });
        });
    }

    loadMore() {
      const { scrollTop, scrollHeight } = document.body;
      const { innerHeight } = window;

      if (innerHeight + scrollTop === scrollHeight) {
        this.setState({
          isLoadMore: true
        });
        this.loadItemsList('isLoadMore');
      }
    }

    render() {
      return (<div>
        {
          this.state.isLoading
            ? <Spinner />
            : <WrappedPage {...this.props} {...this.state} />
        }

        {
          this.state.isLoadMore
            ? <Spinner />
            : null
        }
      </div>);
    }
  };
};
