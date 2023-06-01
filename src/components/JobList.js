import { useEffect, useState } from "react";
import JoblyApi from "../api";
import "../stylesheets/list.css"
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

  const [jobs, setJobs] = useState({
    data:  null,
    isLoading: true
  });

  useEffect(function fetchJobsWhenMounted() {
      fetchJobs();
  }, []);

  async function fetchJobs(query="_") {
    const result = await JoblyApi.getAllJobs(query);
    setJobs({
      data: result,
      isLoading: false
    });
  }

  if (jobs.isLoading) return (<Loader />);

  return (
    <div className="list">
        <SearchForm search={fetchJobs} />
        <JobCardList jobs={jobs.data} />
    </div>
  );
}

export default JobList;