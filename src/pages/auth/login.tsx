import { useFormik } from "formik";
import * as Yup from "yup";
import { ICredentials, loginRequest } from "@/redux/actions/authActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHooks";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { loginError, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username or email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values: ICredentials) => {
      dispatch(loginRequest(values));
    },
  });

  const disabled =
    Object.keys(formik.touched).length < 1 || !formik.isValid || loading;

  if (user) {
    router.push('/main');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-8">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username or email address
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
            <div className="text-red-500 text-sm">
              {formik.errors.username}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
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
        {loginError && (
          <div className="text-red-500 text-sm mb-4">{loginError}</div>
        )}
        <br />
        <div className="mb-4">
          <button
            // disabled={disabled}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-300 disabled:opacity-50"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
