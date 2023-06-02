import { useEffect, useState } from "react";
import JoblyApi from "../api";
import "../stylesheets/list.css";
import JobCardList from "./JobCardList";
import Loader from "./Loader";
import SearchForm from "./SearchForm";
import ReactPaginate from "react-paginate";

/** Component to render a JobList
 *
 *  props:
 *  -company
 *     e.g. {handle:"ayala-buchanan",
 *          name:"Ayala-Buchanan",
 *          description:"Make radio physical",
 *          numEmployees:309,
 *          logoUrl:null,
 *          jobs:[{id:99,title:"researcher",salary:167000,equity:"0.020"},...]
 *          }
 *
 *  state:
 *  -jobs (array of job objects)
 *    e.g. jobs:[
 *            {id:99,
 *            title:"researcher",
 *            salary:167000,
 *            equity:"0.020",
 *            companyName:"Ayala-Buchanan"
 *            },...
 *         ]
 *
 *  effects:
 *  -when mounted fetchJobs()
 *
 *  {CompanyDetail, RoutesList} -> JobList -> {Loader, JobCardList}
 */

function JobList() {
  const [jobs, setJobs] = useState({
    data: [],
    isLoading: true
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(function fetchJobsWhenMounted() {
    fetchJobs();
  }, []);

  async function fetchJobs(query = "_") {
    const result = await JoblyApi.getAllJobs(query);
    setJobs({
      data: result,
      isLoading: false
    });
  }

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function handlePageChange(selectedPage) {
    setCurrentPage(selectedPage.selected);
    goToTop();
  }

  const jobsPerPage = 20;
  const offset = currentPage * jobsPerPage;
  const currentPageJobs = jobs.data.slice(offset, offset + jobsPerPage);

  if (jobs.isLoading) return (<Loader />);

  return (
    <div className="list">
      <SearchForm search={fetchJobs} />
      <JobCardList jobs={currentPageJobs} />
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(jobs.data.length / jobsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default JobList;

// function JobList() {
//   const [jobs, setJobs] = useState({
//     data: null,
//     isLoading: true
//   });

//   useEffect(function fetchJobsWhenMounted() {
//     fetchJobs();
//   }, []);

//   async function fetchJobs(query = "_") {
//     const result = await JoblyApi.getAllJobs(query);
//     //TODO: result for no jobs found
//     setJobs({
//       data: result,
//       isLoading: false
//     });
//   }

//   function goToTop() {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };



//   if (jobs.isLoading) return (<Loader />);

//   return (
//     <div className="list">

//       <SearchForm search={fetchJobs} />
//       <JobCardList jobs={jobs} />
//     </div>
//   );
// }

// export default JobList;