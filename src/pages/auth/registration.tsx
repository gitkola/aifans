import { useFormik } from "formik";
import * as Yup from "yup";
import { registerRequest } from "../../redux/actions/authActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHooks";
import { useRouter } from "next/router";

const Register = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { registerError, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(2, "Username must be at least 2 characters"),
      email: Yup.string().required("Email required").email("Invalid email address"),
      password: Yup.string()
        .required("Password required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      dispatch(registerRequest(values));
    },
  });

  const disabled =
    Object.keys(formik.touched).length < 1 ||
    !formik.isValid ||
    loading;

  if (user) {
    router.push('/main');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md px-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Create an account with email to get started. You can
          update your profile later.
        </p>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
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
          <div className="h-4 mt-1">
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
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
          <div className="h-4 mt-1">
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm  mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
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
          <div className="h-4 mt-1">
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
        </div>
        <div className="h-4">
          {registerError && (
            <div className="text-red-500 text-sm mb-4">{registerError}</div>
          )}
        </div>
        <br />
        <div className="mb-4">
          <button
            // disabled={disabled}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-300 disabled:opacity-50"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
