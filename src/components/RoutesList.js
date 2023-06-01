import { Navigate, Route, Routes } from 'react-router-dom';
import CompanyDetail from './CompanyDetail';
import CompanyList from './CompanyList';
import HomePage from './HomePage';
import Joblist from './JobList';
import LoginForm from './LoginForm';
import ProfileUpdateForm from './ProfileUpdateForm';
import SignupForm from './SignUpForm';
/** List of Route components for routing
 *
 * props:
 *  - signup (function to handle submission of SignupForm)
 *  - login (function to handle submission of LoginForm)
 *  - update (function to handle submission of ProfileUpdateForm)
 *  - currUser (object with user data)
 *
 * App -> RoutesList -> {HompePage, CompanyList, CompanyDetail, Joblist}
 */
function RoutesList({ signup, login, update, currUser }) {
  return (

    <Routes>
      {currUser
        ?
        <>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<Joblist />} />
          <Route path="/profile" element={<ProfileUpdateForm update={update} />} />
        </>
        :
        <>
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
        </>
      }
      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
}

export default RoutesList;