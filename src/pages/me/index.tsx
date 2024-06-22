import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";
import { logoutRequest } from "@/redux/actions/authActions";
import { useRouter } from "next/router";

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state: AppState) => state.user);
  console.log({ router })
  if (!user && !loading) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <p className="text-lg">Username: {user?.username}</p>
        <p className="text-lg">Email: {user?.email}</p>
        <p className="text-lg">Role: {user?.role}</p>
        <p className="text-lg">id: {user?.id}</p>
        <br />
        <div className="mb-4">
          <button
            onClick={() => {
              dispatch(logoutRequest());
            }}
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 focus:ring focus:ring-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
