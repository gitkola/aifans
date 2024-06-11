// src/pages/register.tsx

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';
import { registerRequest } from '../redux/actions/authActions';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, error, loading } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router]);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
      email: Yup.string().email('Invalid email address'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: (values) => {
      dispatch(registerRequest(values));
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-8">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="mt-1 block w-full p-2 text-gray-700 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 block w-full p-2 text-gray-700 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mt-1 block w-full p-2 text-gray-700 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <br />
        <div className="mb-4">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
