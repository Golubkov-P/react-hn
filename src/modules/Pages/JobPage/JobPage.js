import React, { Component } from 'react';

import Item from '../Common/Item';
import Spinner from '../Common/Spinner';

import api from '../../api';

let pagination = 0;

class JobPage extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      isLoading: true,
      isLoadMore: false
    };

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
    const startIndex = pagination;

    pagination = pagination + 10;

    api.getStoriesList('jobstories')
      .then(result => {
        for (let i = startIndex; i <= pagination; i++) {
          if (i === pagination) {
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
    const newItem = [];

    api.getStory(id)
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
    const { items, isLoading, isLoadMore } = this.state;

    return (
      <div>
        { isLoading
            ? <Spinner />
            : items.map((item, indx)  => {
              return <Item key={indx} item={item} />;
            })
        }

        {
          isLoadMore
            ? <Spinner />
            : null
        }
      </div>
    );
  }
}

export default JobPage;
