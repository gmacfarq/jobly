import { Navigate, Route, Routes} from 'react-router-dom';
import CompanyDetail from './CompanyDetail';
import CompanyList from './CompanyList';
import HomePage from './HomePage';
import Joblist from './JobList';
import LoginForm from './LoginForm';
import ProfileUpdateForm from './ProfileUpdateForm';
import SignupForm from './SignUpForm';
/** List of Route components for routing
 *
 * App -> RoutesList -> {HompePage, CompanyList, CompanyDetail, Joblist}
 */
function RoutesList({signup, login, update}){
  return (

  <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<Joblist />} />
        <Route path="/signup" element={<SignupForm signup={signup}/>} />
        <Route path="/login" element={<LoginForm login={login}/>} />
        <Route path="/profile" element={<ProfileUpdateForm update={update}/>} />
        <Route path="*" element={<Navigate to="/" />} />
  </Routes>

  )
}

export default RoutesList