import React from 'react';
import './_MainHeader.less';
import { Menu, Dropdown } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import UploadCase from '../Upload/UploadCase';
import Icon from '@ant-design/icons';
import Profile from '../../../styles/icons/profile.svg';
import HRFLogo from '../../../styles/hrf-logo-white.png';
import Notifications from './Notifications';
import { useAuth0 } from '@auth0/auth0-react';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Uploaded Case',
    text: 'Successfully uploaded case #12345.',
  },
  {
    id: '2',
    title: 'User registration',
    text: 'A new user has requested to join the application.',
  },
  {
    id: '3',
    title: 'Judge Report',
    text: 'A judge you follow has handed down a decision',
  },
];

export default function MainHeader(props) {
  const { getPendingCases } = props;
  const history = useHistory();
  const { logout } = useAuth0();
  const onClick = ({ key }) => {
    if (key === '/logout') {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      history.push(`${key}`);
    }
  };

  const onClickViewNotification = id => {
    alert(`View notification id: '${id}'`);
  };

  const onClickDismissNotification = id => {
    alert(`Dismiss notification id: '${id}'`);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item className="account" key="/account">
        Account
      </Menu.Item>
      <Menu.Item className="support" key="/support">
        Support
      </Menu.Item>
      <Menu.Item className="log-out" key="/logout">
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="site-page-header">
      <img className="hrf-logo" src={HRFLogo} alt="HRF Logo" />
      <div id="nav-flex-container">
        <UploadCase getPendingCases={getPendingCases} />
        <Notifications
          notifications={MOCK_NOTIFICATIONS}
          onClickView={onClickViewNotification}
          onClickDismiss={onClickDismissNotification}
        />
        <Dropdown className="account-drop-down" overlay={menu}>
          <ul className="accounts" onClick={e => e.preventDefault()}>
            <div className="user-button">
              <Icon
                component={() => (
                  <Link to="/account">
                    <img id="avatar-icon" src={Profile} alt="profile icon" />
                  </Link>
                )}
              />
            </div>
          </ul>
        </Dropdown>
      </div>
    </div>
  );
}
