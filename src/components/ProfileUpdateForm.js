import { useContext, useState } from "react";
import "../stylesheets/UserForm.css";
import userContext from "./userContext";
import Alerts from "./Alerts";

/** Component to render and handle submission of profile update form
 *
 *  props:
 *  - update (function from parent component to update a user)
 *
 *  RoutesList -> ProfileUpdateForm
 */
function ProfileUpdateForm({ update }) {
  const { currUser } = useContext(userContext);
  const [formData, setFormData] = useState(currUser.data);
  const [alerts, setAlerts] = useState(null)


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
    const {username, firstName, lastName, email} = formData

    try {
      await update({username, firstName, lastName, email});
      setAlerts(["Profile updated"])
    } catch (errs) {
      setAlerts(errs);
    }
  }

  return (
    <div>
      <h1>Profile</h1>
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
              disabled
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
        {alerts && <Alerts messages={alerts}/>}
    </div>
  );
}

export default ProfileUpdateForm;