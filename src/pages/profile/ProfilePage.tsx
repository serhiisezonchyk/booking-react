import React from 'react';
import List from '../../components/list/List';
import { userData } from '../../data/dummydata';

const ProfilePage: React.FC = () => {
  const user = userData;
  return (
    <div className="profile-page container ">
      <div className="profile-page__details details hide-scroll">
        <div className="wrapper details-wrapper">
          <div className="details__title">
            <h1 className="details__title-text">User information</h1>
            <button className="details__title-button">Update profile</button>
          </div>
          <div className="details__user-info">
            <span className="details__user-info__field">
              Avatar: <img className="details__user-info__avatar" src={user.img} alt="User image" />
            </span>
            <span className="details__user-info__field">
              Name: <strong>{user.name}</strong>
            </span>
            <span className="details__user-info__field">
              Email: <strong>johndou@gmail.com</strong>
            </span>
          </div>

          <div className="details__title">
            <h1 className="details__title-text">My list</h1>
            <button className="details__title-button">Create New Post</button>
          </div>
          <List />

          <div className="details__title">
            <h1 className="details__title-text">Saved list</h1>
          </div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
