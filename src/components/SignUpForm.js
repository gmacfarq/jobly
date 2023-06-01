import { useState } from "react";
import "../stylesheets/UserForm.css";
const INITIAL_FORM_STATE = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: ""
};
/** Component to render and handle submission of signup form
 *
 *  props:
 *  - signup (function from parent component to signup a user)
 *
 *  RoutesList -> SignupForm
 */
function SignupForm({ signup }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(currFormData => ({
      ...currFormData,
      [name]: value,
    }));
  }

  /** handle form submission */
  function handleSubmit(evt) {
    evt.preventDefault();
    signup(formData);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div className="UserForm">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="form-control rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="form-control rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName"> First name</label>
            <input
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              className="form-control rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              className="form-control rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="form-control rounded"
            />
          </div>
          <div className="input-group">
            <button className="btn btn-outline-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;