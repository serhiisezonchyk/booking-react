import { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputAuth from '../../components/input-auth/InputAuth';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../data/types';
import apiRequest from '../../lib/apiRequest';
interface ValidationError {
  path: string;
  message: string;
}
interface ErrorResponse {
  error: string;
  details?: ValidationError[];
}
interface LoginForm {
  username: string | null;
  email: string;
  password: string;
}
interface LoginResponse {
  message: string;
  user: Omit<User, 'password'>;
}
const LoginPage = () => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const { data } = await apiRequest.post<LoginResponse>('/auth/login', {
        username,
        password,
      } as LoginForm);
      updateUser?.(data.user);
      navigate('/');
    } catch (e) {
      const message: ErrorResponse = (e as AxiosError).response?.data as ErrorResponse;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login container">
      <div className="login__container">
        <form action="" className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Welcome back</h1>
          <InputAuth
            name="username"
            placeholder="Username"
            type="text"
            error={error?.details?.find((el) => el.path === 'username')?.message}
          />
          <InputAuth
            name="password"
            placeholder="Password"
            type="password"
            error={error?.details?.find((el) => el.path === 'password')?.message}
          />

          <button disabled={isLoading} className="login-form__button">
            login
          </button>
          {error?.error && <span className="login-form__error">{error.error}</span>}
          <Link to="/register" className="login-form__link">
            Don`t you have an account?
          </Link>
        </form>
      </div>
      <div className="login__img-container">
        <img src="/bg.png" alt="" className="login__img-container__img" />
      </div>
    </div>
  );
};

export default LoginPage;
