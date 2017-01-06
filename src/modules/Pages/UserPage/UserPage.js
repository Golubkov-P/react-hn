import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import HocItemPages from 'Common/HocItemPages';

import './UserPage.css';

class UserPage extends Component {
  render() {
    const { item } = this.props;

    return (
      <div className='user'>
        <h2 className='user__name'>{item.id}</h2>
        {
          item.about
            ? <div className='user__field' dangerouslySetInnerHTML={{ __html: item.about }} />
            : null
        }
        <ul className='user__fields-list'>
          <li className='user__field'>Karma: {item.karma}</li>
          <li className='user__field'>Created: {moment(item.created, 'X').fromNow()}</li>
        </ul>
      </div>
    );
  }
}

UserPage.propTypes = {
  item: PropTypes.object.isRequired
};

export default HocItemPages('user')(UserPage);
