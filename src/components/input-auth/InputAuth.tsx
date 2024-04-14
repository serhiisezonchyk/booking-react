interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  error?: string;
}

const InputAuth: React.FC<InputProps> = ({ name, placeholder, type, error }) => (
  <div className="auth-form__item">
    <input name={name} placeholder={placeholder} type={type} className={`auth-form__item-input ${error && 'error'}`} />
    {error && <span className="auth-form__item-error">{error}</span>}
  </div>
);
export default InputAuth;
