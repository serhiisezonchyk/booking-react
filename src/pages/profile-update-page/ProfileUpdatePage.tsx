import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Uploadwidget from '../../components/upload-widget/Uploadwidget';
import { AuthContext, User } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

interface FormValues {
  username: string;
  email: string;
  password: string;
  checkPassword: string;
}
interface UserUpdateResponse {
  user: User;
}
interface ErrorResponse {
  error: string;
  details?: any;
}
const ProfileUpdatePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const el = Object.fromEntries(formData);
    try {
      const res = await apiRequest.put<UserUpdateResponse>(`/user/${user?.id}`, { ...el, avatar: avatar[0] });
      updateUser?.(res.data.user);
      navigate('/profile');
    } catch (error) {
      const message: ErrorResponse = (error as AxiosError).response?.data as ErrorResponse;
      setError(message?.error || 'An error occured.');
    }
  };
  return (
    <div className="pupdate-page container">
      <div className="pupdate-page__form-container form-container">
        <h1>Update profile</h1>
        <form className="form-container__form form" onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="username" className="form-item__label">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-item__input"
              defaultValue={user?.username}
            />
          </div>
          <div className="form-item">
            <label htmlFor="email" className="form-item__label">
              Email
            </label>
            <input type="text" name="email" id="email" className="form-item__input" defaultValue={user?.email} />
          </div>
          <div className="form-item">
            <label htmlFor="password" className="form-item__label">
              Password
            </label>
            <input type="password" name="password" id="password" className="form-item__input" />
          </div>
          <div className="form-item">
            <label htmlFor="checkPassword" className="form-item__label">
              Repeat password
            </label>
            <input type="text" name="checkPassword" id="checkPassword" className="form-item__input" />
          </div>
          <button className="form-button">Update</button>
        </form>
      </div>
      <div className="pupdate-page__side side">
        <img src={avatar[0] || user?.avatar || '/noavatar.jpeg'} alt="" className="side__img" />
        <Uploadwidget
          uwConfig={{
            cloudName: 'duld43v1i',
            uploadPreset: 'booking',
            multiple: false,
            maxImageFileSize: 200000,
            folder: 'avatars',
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
