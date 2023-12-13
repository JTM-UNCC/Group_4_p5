/* Source:
/  Author: Kwong, S.
/  Accessed: 12/12/2023, 6:23 PM
/  Code: 'activityFeed.jsx'
/  Link to Author: https://github.com/samjkwong
*/

import React from 'react';
import axios from 'axios';
import './activityFeed.css';
import { HashLink as Link } from 'react-router-hash-link';

class ActivityFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: []
    };

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh(event) {
    event.preventDefault();
    axios.get('/activityFeed')
      .then((resData) => {
        this.setState({
          activities: resData.data
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  
  componentDidMount() {
    axios.get('/activityFeed')
      .then((resData) => {
        this.setState({
          activities: resData.data
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  render() {
    console.log('activityFeed render');
    console.log(this.state.activities);
    var initiate = [];
    for (var activity of this.state.activities) {
      if (activity.type === 'photo') {
        initiate.push(
          <li className='collection-item' key={activity.date_time}>
            <Link smooth to={'/photos/'+activity.photo_owner_id+'#'+activity.file_name}>
              <img className='project-activity-thumbnail' src={'../../images/'+activity.file_name} />
            </Link>
            User <b>{activity.login_name}</b> uploaded a new photo at <b>{activity.date_time}</b>
          </li>);
      } else if (activity.type === 'comment') {
        initiate.push(
          <li className='collection-item' key={activity.date_time}>
            <Link smooth to={'/photos/'+activity.photo_owner_id+'#'+activity.file_name}>
              <img className='project-activity-thumbnail' src={'../../images/'+activity.file_name} />
            </Link>
            User <b>{activity.login_name}</b> commented on user <b>{activity.photo_owner}</b>'s photo at <b>{activity.date_time}</b>
            <div><i>"{activity.comment}"</i></div>
          </li>);
      } else if (activity.type === 'registration') {
        initiate.push(
          <li className='collection-item' key={activity.date_time}>
            User <b>{activity.login_name}</b> registered at <b>{activity.date_time}</b>
          </li>);
      } else if (activity.type === 'login') {
        initiate.push(
          <li className='collection-item' key={activity.date_time}>
            User <b>{activity.login_name}</b> logged in at <b>{activity.date_time}</b>
          </li>);
      } else {
        initiate.push(
          <li className='collection-item' key={activity.date_time}>
            User <b>{activity.login_name}</b> logged out at <b>{activity.date_time}</b>
          </li>);
      }

    }
    return (
      <ul className='collection'>
        <button style={{background: '#64CCC5', color: '#04364A'}} onClick={this.handleRefresh}>Refresh</button>
        {initiate}
      </ul>
    );
  }
}

export default ActivityFeed;
