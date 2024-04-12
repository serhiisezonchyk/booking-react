import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';

interface ErrorResponse {
  error: string;
  details?: any;
}
interface RegisterForm {
  username: string | null;
  email: string;
  password: string;
}
interface RegisterResponse {
  message: string;
}
const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await apiRequest.post<RegisterResponse>('/auth/register', {
        username,
        email,
        password,
      } as RegisterForm);
      navigate('/login');
    } catch (e) {
      const message: ErrorResponse = (e as AxiosError).response?.data as ErrorResponse;
      setError(message?.error || 'An error occured.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="register container">
      <div className="register__container">
        <form action="" className="register-form" onSubmit={handleSubmit}>
          <h1 className="register-form__title">Create an account</h1>
          <input name="username" placeholder="Username" type="text" className="register-form__input" />
          <input name="email" placeholder="Email" type="text" className="register-form__input" />
          <input name="password" placeholder="Password" type="password" className="register-form__input" />
          <button disabled={isLoading} className="register-form__button">
            Register
          </button>
          {error && <span className="register-form__error">{error}</span>}
          <Link to="/login" className="register-form__link">
            Do you have an account?
          </Link>
        </form>
      </div>
      <div className="register__img-container">
        <img src="/bg.png" alt="" className="register__img-container__img" />
      </div>
    </div>
  );
};

export default Register;
