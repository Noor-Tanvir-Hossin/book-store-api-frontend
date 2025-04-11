import { useSignupMutation } from "@/redux/features/auth/authApi";
import { TMessage } from "@/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {

  const [signup] = useSignupMutation();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    const toastId = toast.loading("Signing up...");
    try {
      const userInfo = {
        name:data.name,
        email: data.email,
        password: data.password,
      };
      console.log(data);

      await signup(userInfo).unwrap();
      toast.success("You're in! Signup successful.", { id: toastId, duration: 2000 });
      navigate('/login')
    } catch (error) {
      toast.error((error as TMessage).data.message);
    };
    
  };

  return (
    <section className="bg-white dark:bg-gray-900 my-5 lg:my-10">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Please Sign UP.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            {/* <div className="mt-6">
              <div className="mt-3 md:flex flex-col  md:-mx-2">
                <label className="label">
                  <span className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Select type of account
                  </span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register("role", { required: true })}
                >
                  <option>Buyer</option>
                  <option>Saller</option>
                </select>
              </div>
            </div> */}

            <form
              
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 mb-6">
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    UserName
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm font-light">
                      Name is required
                    </span>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm font-light">
                      Email is required
                    </span>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-500 text-sm font-light">
                      password is required
                    </span>
                  )}
                  {/* {errors.password?.type === "minLength" && (<span className='text-red-500 text-sm font-light'>password must have 6 characters</span>)} */}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500 text-sm font-light">
                      Password must have at least 8 characters, one uppercase,
                      one number, and one special character
                    </span>
                  )}
                </div>
              </div>

              {/* <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => {
                      if (watch("password") != value) {
                        return "your password did not match";
                      }
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm font-light">
                    Both password field must match
                  </span>
                )}
              </div> */}

              <button
                type="submit"
                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Sign Up</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            <div className="mt-6 ">
              <p className="text-sm text-black ">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-lg text-blue-500 hover:underline dark:text-blue-400"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
