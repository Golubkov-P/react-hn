import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import api from '../../api';

import './UserPage.css';

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const { userId } = this.props.params;

    api
      .getUser(userId)
      .then(result => {
        if (result === null) {
          return;
        }

        this.setState({
          user: result
        });
      });
  }

  render() {
    const { user } = this.state;
    const UserInfo = () => {
      return (
        <div className='user'>
          <h2 className='user__name'>{user.id}</h2>
          <ul className='user__fields-list'>
            {
              user.about
                ? <li className='user__field'>About: {user.about}</li>
                : null
            }
            <li className='user__field'>Karma: {user.karma}</li>
            <li className='user__field'>Created: { moment(user.created, 'X').fromNow() }</li>
          </ul>
        </div>
      );
    };

    return (
      <div>
        { user.id ? UserInfo() : null }
      </div>);
  }
}

UserPage.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string.isRequired
  })
};

export default UserPage;
