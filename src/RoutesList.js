import { Navigate, Route, Routes} from 'react-router-dom';
import CompanyDetail from './CompanyDetail';
import CompanyList from './CompanyList';
import HomePage from './HomePage';
import Joblist from './JobList';
function RoutesList(){
  return (

  <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<Joblist />} />
        <Route path="*" element={<Navigate to="/" />} />
  </Routes>

  )
}

export default RoutesList