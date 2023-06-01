import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "../api";
import "../stylesheets/list.css"
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** Component to render a CompanyList
 *
 *  state:
 *  -companies (array of company objects)
 *    e.g. companies:[
 *            {handle:"ayala-buchanan",
 *            name:"Ayala-Buchanan",
 *            description:"Make radio physical",
 *            numEmployees:309,
 *            logoUrl:null,
 *            jobs:[{id:99,title:"researcher",salary:167000,equity:"0.020"},...]
 *            },...
 *         ]
 *
 *  effects:
 *  -when mounted
 *    fetchCompanies()
 *
 *  RoutesList -> CompanyList -> {Loader, CompanyCard}
 */
function CompanyList() {
  const [companies, setCompanies] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function fetchCompaniesWhenMounted() {
    fetchCompanies();
  }, []);

  async function fetchCompanies(query="_") {
    const result = await JoblyApi.getAllCompanies(query);
    setCompanies({
      data: result,
      isLoading: false
    });
  }

  if (companies.isLoading) return (<Loader />);

  return (
    <div className="List">
      <SearchForm search={fetchCompanies} />
      {companies.data.map(company =>
        <Link key={company.handle} style={{textDecoration:'none'}} to={`/companies/${company.handle}`}>
          <CompanyCard company={company} />
        </Link>
      )}
    </div>
  );
}

export default CompanyList;