import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  // Select state and dispatch action on those state using useSelector and useDispatch respectively

  const dispatch = useDispatch();
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
    );
    
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };


  if (isLoading) {
    return <Spinner></Spinner>
  }
    return (
      <>
        <section className="heading">
          <h1>
            <FaUser></FaUser>
          </h1>
          <p>Please create an account</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                id="name"
                value={name}
                type="text"
                className="form-control"
                onChange={onChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <input
                id="email"
                value={email}
                type="email"
                className="form-control"
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <input
                id="password"
                value={password}
                type="password"
                className="form-control"
                onChange={onChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <input
                id="password2"
                value={password2}
                type="password"
                className="form-control"
                onChange={onChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
      </>
    );
}

export default Register;
