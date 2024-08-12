import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

import Input from "components/common/Input";
import Button from "components/common/Button";
import Error from "components/common/Error";
import { signInAction, clearMessage } from "redux store/actions/authActions";
import { SIGN_IN_FAIL } from "redux store/constants/authConstants";

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.errorMessage);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return null;
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    await dispatch(signInAction(formData, navigate));
    setLoading(false);
  };

  const handleClearMessages = () => {
    dispatch(clearMessage());
  };

  const validateForm = () => {
    handleClearMessages();
    if (username.length < 3) {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: "Username must be at least 3 characters long.",
      });
      return false;
    }
    if (password.length < 6) {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: "Password must be at least 6 characters long.",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    handleClearMessages();
  }, []);

  return (
    <form className="flex flex-col items-center gap-6 my-4" onSubmit={onSubmit}>
      {error && <Error errorMessage={error} onClick={handleClearMessages} />}
      <Input
        type="text"
        placeholder="username"
        value={username}
        required
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <span>Signing in...</span>
            <PulseLoader size={8} color="white" />
          </>
        ) : (
          <span>Sign in</span>
        )}
      </Button>
      <div className="space-x-2">
        <span className="text-white text-sm">Don't have an account?</span>
        <Link to={"/sign-up"} className="text-main-green font-semibold">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
