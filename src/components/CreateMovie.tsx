import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateMovie() {
  const [formData, setFormData] = useState({ name: "", year: "", image: "" });
  const [errorData, setErrorData] = useState({ name: "", year: "", image: "" });
  const navigate = useNavigate();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response: any = await axios.post(
        "/api/movies",
        { ...formData, actors: [] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("RESPONSE IS: ", response);

      navigate("/movies");
    } catch (error: any) {
      console.log("THE ERROR IS: ", error);
      setErrorData(error.response.data.errors);
    }
  }

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const newFormData = {
      ...formData,
      [targetElement.name]: targetElement.value,
    };
    setFormData(newFormData);
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name" className="label">
              Movie Name
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errorData.name && (
                <small className="has-text-danger">{errorData.name}</small>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="year" className="label">
              Year
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
              {errorData.year && (
                <small className="has-text-danger">{errorData.year}</small>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="image" className="label">
              Image
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
              {errorData.image && (
                <small className="has-text-danger">{errorData.image}</small>
              )}
            </div>
          </div>

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateMovie;