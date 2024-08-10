import SignUpForm from "components/forms/SignUpForm";

const SignUp = () => {
  return (
    <div className="w-full min-h-screen max-md:bg-light-gray bg-dark-gray flex justify-center items-center">
      <div className="w-full md:max-w-md p-3 md:rounded-lg md:shadow-md bg-light-gray">
        <h1 className="text-2xl text-white text-center font-bold">Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
