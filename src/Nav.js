import { Link } from 'react-router-dom';
function Nav() {
  return (
    <nav>
      <div className="menu-link">
        <Link to="/companies">Companies</Link>
      </div>
      <div className="menu-link">
        <Link to="/jobs">Jobs</Link>
      </div>
      <div className="menu-link">
        <Link to="/">Jobly</Link>
      </div>
    </nav>
  );
}

export default Nav;