import { useEffect, useState } from "react";
import JoblyApi from "../api";
import "../stylesheets/list.css";
import JobCardList from "./JobCardList";
import Loader from "./Loader";
import SearchForm from "./SearchForm";

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
  const [pageSize] = useState(20);
  const [pageNum, setPageNum] = useState(0);
  const [jobs, setJobs] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function fetchJobsWhenMounted() {
    fetchJobs();
  }, []);

  async function fetchJobs(query = "_") {
    const result = await JoblyApi.getAllJobs(query);
    //TODO: result for no jobs found
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

  function pageForward() {
    setPageNum(currPageNum => currPageNum + 1);
    goToTop();
  }

  function pageBackward() {
    setPageNum(currPageNum => currPageNum - 1);
    goToTop();
  }

  const isFirstPage = pageNum === 0;
  const isLastPage = (pageNum +1) * pageSize >= jobs.data?.length;
  const paginatedJobs = jobs.data?.slice(pageNum * pageSize, (pageNum + 1) * pageSize);

  if (jobs.isLoading) return (<Loader />);

  return (
    <div className="list">

      <SearchForm search={fetchJobs} />
      {!isFirstPage && <p className="btn" onClick={pageBackward}>{"<"}</p>}
      <p style={{display:"inline"}}>{pageNum + 1 }</p>
      {!isLastPage && <p className="btn" onClick={pageForward}>{">"}</p>}
      <JobCardList jobs={paginatedJobs} />
      {!isFirstPage && <p className="btn" onClick={pageBackward}>{"<"}</p>}
      <p style={{display:"inline"}}>{pageNum + 1 }</p>
      {!isLastPage && <p className="btn" onClick={pageForward}>{">"}</p>}
    </div>
  );
}

export default JobList;