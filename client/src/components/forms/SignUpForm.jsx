import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

import Input from "components/common/Input";
import Button from "components/common/Button";
import AvatarUploadForm from "components/forms/AvatarUploadForm";
import Error from "components/common/Error";
import { signUpAction, clearMessage } from "redux store/actions/authActions";
import { SIGN_UP_FAIL } from "redux store/constants/authConstants";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return null;
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("avatar", avatar);

    await dispatch(signUpAction(formData, navigate));
    setLoading(false);
  };

  const handleClearMessages = () => {
    dispatch(clearMessage());
  };

  const validateForm = () => {
    handleClearMessages();

    if (username.length < 3) {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: "Username must be at least 3 characters long.",
      });
      return false;
    }
    if (password.length < 6) {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: "Password must be at least 6 characters long.",
      });
      return false;
    }
    if (name.length < 3) {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: "Name must be at least 3 characters long.",
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
      {errorMessage && (
        <Error errorMessage={errorMessage} onClick={handleClearMessages} />
      )}
      <AvatarUploadForm setAvatar={setAvatar} />
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
      <Input
        type="text"
        placeholder="name"
        value={name}
        required
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <Input
        type="text"
        placeholder="bio"
        value={bio}
        onChange={(event) => {
          setBio(event.target.value);
        }}
      />
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <span>Signing up...</span>
            <PulseLoader size={8} color="white" />
          </>
        ) : (
          <span>Sign up</span>
        )}
      </Button>
      <div className="space-x-2">
        <span className="text-white text-sm">Already have an account?</span>
        <Link to={"/sign-in"} className="text-main-green font-semibold">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
