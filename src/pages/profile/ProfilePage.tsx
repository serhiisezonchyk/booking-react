import React, { Suspense, useContext } from 'react';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import List from '../../components/list/List';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { DeferProfilePosts, DeferProfilePostsResponse } from '../../lib/loaders';

const ProfilePage: React.FC = () => {
  const data = useLoaderData() as DeferProfilePosts;
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser?.(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-page container ">

      <div className="profile-page__details details hide-scroll">
        <div className="wrapper details-wrapper">
          <div className="details__title">
            <h1 className="details__title-text">User information</h1>
            <Link to="/profile/update">
              <button className="details__title-button">Update profile</button>
            </Link>
          </div>
          <div className="details__user-info">
            <span className="details__user-info__field">
              Avatar:
              <img className="details__user-info__avatar" src={user?.avatar || '/noavatar.jpeg'} alt="User image" />
            </span>
            <span className="details__user-info__field">
              Name: <strong>{user?.username}</strong>
            </span>
            <span className="details__user-info__field">
              Email: <strong>{user?.email}</strong>
            </span>
            <button onClick={handleLogout} className="details__user-info__button">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="profile-page__lists hide-scroll">
        <div className="details__title">
          <h1 className="details__title-text">My list</h1>
          <Link to="/add">
            <button className="details__title-button">Create New Post</button>
          </Link>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={data.postResponse} errorElement={<p>Error loading posts ...</p>}>
            {(postResponce: DeferProfilePostsResponse) => <List posts={postResponce.data.userPosts} />}
          </Await>
        </Suspense>
        <div className="details__title">
          <h1 className="details__title-text">Saved list</h1>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={data.postResponse} errorElement={<p>Error loading posts ...</p>}>
            {(postResponce: DeferProfilePostsResponse) => <List posts={postResponce.data.savedPosts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
