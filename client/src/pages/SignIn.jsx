import SignInForm from "components/forms/SignInForm";

const SignIn = () => {
  return (
    <div className="w-full min-h-screen max-md:bg-light-gray bg-dark-gray flex flex-col justify-center items-center">
      <div className="w-full md:max-w-md p-3 md:rounded-lg md:shadow-md bg-light-gray">
        <h1 className="text-2xl text-white text-center font-bold">Sign In</h1>
        <SignInForm />
      </div>
      <div className="md:max-w-md text-center bg-light-gray rounded-lg my-2 p-3">
        <span className="text-sm font-semibold text-gray-300">
          To get the full experience of our app, we recommend creating two
          separate accounts and signing in from two different browsers. This
          way, you can chat with yourself in real-time
        </span>
      </div>
    </div>
  );
};

export default SignIn;
