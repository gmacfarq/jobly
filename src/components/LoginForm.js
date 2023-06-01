import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/UserForm.css";
import Alerts from "./Alerts";
const INITIAL_FORM_STATE = {
  username: "",
  password: ""
};
/** Component to render and handle submission of login form
 *
 *  props:
 *  - login (function from parent component to login a user)
 *
 *  RoutesList -> LoginForm
 */
function LoginForm({ login }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [alerts, setAlerts] = useState(null);
  const navigate = useNavigate();

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(currFormData => ({
      ...currFormData,
      [name]: value,
    }));
  }

  /** handle form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/jobs");
    } catch (errs) {
      setAlerts(errs);
    }
  }
  //TODO: alert component with props for type of alert and array of messages
  return (
    <div>
      <h1>Log In</h1>
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
              type="password"
            />
          </div>
          <div className="input-group">
            <button className="btn btn-outline-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      {alerts && <Alerts messages={alerts} />}
    </div>
  );
}

export default LoginForm;