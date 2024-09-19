import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ fetchUser }: { fetchUser: Function }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const newFormData = {
      ...formData,
      [targetElement.name]: targetElement.value,
    };
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", formData);
      // save the authorisation token that the API sent us in the browsers memory
      // this will allow us to retrieve it for subsequent requests when we need to send the token
      localStorage.setItem("token", response.data.token);
      fetchUser(); // <-- after we set the token, call the function that checks if we are logged in and sets the UI accordingly
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errorMessage && (
              <small className="has-text-danger">{errorMessage}</small>
            )}
          </div>
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;