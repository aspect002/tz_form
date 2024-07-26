import React from 'react';
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {

    alert(JSON.stringify(data));
    alert('Успешно зарегистрировано!');
  };
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        {...register('username', {
          required: 'This field is required',
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: 'username must not contain numbers',
          },
        })}
      />
      {errors.username && (
        <p className="error-message">{errors.username.message}</p>
      )}

      <input
        type='email'
        placeholder="E-mail"
        {...register('email', {
          required: "This field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
      />
      {errors.email && (
        <p className="error-message">
          {errors.email.message}
        </p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'This field is required',
          minLength: {
            value: 6,
            message: 'The password must be at least 6 characters',
          },
          pattern: {
            value: /[A-Z]/,
            message: 'The password must contain at least one capital letter',
          },
        })}
      />
      {errors.password && <p className="error-message">{errors.password.message}</p>}

      <input
        type="password"
        placeholder="Password confirmation"
        {...register('confirmPassword', {
          required: 'This field is required',
          validate: (value) => value === password || 'Password mismatch',
        })}
      />
      {errors?.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}

      <input
        type="date"
        {...register('dateOfBirth', {
          required: 'This field is required',
          validate: (value) => {
            const date = new Date(value);
            const year = date.getFullYear();
            return year.toString().length <= 4 || 'The year must contain no more than 4 digits';
          },
        })}
      />
      {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth.message}</p>}

      <select {...register('gender', { required: 'This field is required' })}>
        <option value="">choose gender</option>
        <option value="man">Man</option>
        <option value="woman">Wooman</option>
      </select>
      {errors.gender && <p className="error-message">{errors.gender.message}</p>}

      <input
        type="tel"
        placeholder="Phone number"
        {...register('phone', {
          required: 'This field is required',
          pattern: {
            value: /^(\+?\d{1,2}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,
            message: 'Invalid phone number format',
          },
        })}
      />
      {errors.phone && <p className="error-message">{errors.phone.message}</p>}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
