import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputAuth from '../../components/input-auth/InputAuth';
import apiRequest from '../../lib/apiRequest';
interface ValidationError {
  path: string;
  message: string;
}
interface ErrorResponse {
  error: string;
  details?: ValidationError[];
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
  const [error, setError] = useState<ErrorResponse | null>(null);
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
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="register container">
      <div className="register__container">
        <form action="" className="register-form" onSubmit={handleSubmit}>
          <h1 className="register-form__title">Create an account</h1>
          <InputAuth
            name="username"
            placeholder="Username"
            type="text"
            error={error?.details?.find((el) => el.path === 'username')?.message}
          />
          <InputAuth
            name="email"
            placeholder="Email"
            type="text"
            error={error?.details?.find((el) => el.path === 'email')?.message}
          />
          <InputAuth
            name="password"
            placeholder="Password"
            type="password"
            error={error?.details?.find((el) => el.path === 'password')?.message}
          />

          <button disabled={isLoading} className="register-form__button">
            Register
          </button>
          {error?.error && <span className="register-form__error">{error.error}</span>}
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
