import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "../api";
import "../stylesheets/list.css"
import Loader from "./Loader";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
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
    data: [],
    isLoading: true
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(function fetchCompaniesWhenMounted() {
    fetchCompanies();
  }, []);

  async function fetchCompanies(query = "_") {
    const result = await JoblyApi.getAllCompanies(query);
    setCompanies({
      data: result,
      isLoading: false
    });
  }

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function handlePageChange(selectedPage) {
    setCurrentPage(selectedPage.selected);
    goToTop();
  }


  const companiesPerPage = 20;
  const offset = currentPage * companiesPerPage;
  const currentPageCompanies = companies.data.slice(
    offset,
    offset + companiesPerPage
  );

  if (companies.isLoading) return <Loader />;

  return (
    <div className="list">
      <SearchForm search={fetchCompanies} />
      {currentPageCompanies.map((company) => (
        <Link
          key={company.handle}
          style={{ textDecoration: "none" }}
          to={`/companies/${company.handle}`}
        >
          <CompanyCard company={company} />
        </Link>
      ))}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(companies.data.length / companiesPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default CompanyList;