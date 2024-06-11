// src/pages/login.tsx

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';
import { logoutRequest } from '../redux/actions/authActions';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, loginError, loading } = useSelector((state: AppState) => state.auth);
  const { user } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <p className="text-lg">Username: {user?.username}</p>
        <p className="text-lg">Email: {user?.email}</p>
        <p className="text-lg">Role: {user?.role}</p>
        <p className="text-lg">id: {user?.id}</p>
        <br />
        <button
          disabled={loading}
          onClick={() => { dispatch(logoutRequest()) }}
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 focus:ring focus:ring-red-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
