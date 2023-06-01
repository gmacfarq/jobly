import "../stylesheets/list.css"
import JobCard from "./JobCard";
/** Component to render a list of JobCard components
 *
 * props:
 * - jobs (array of job objects)
 *  e.g. jobs:[
 *            {id:99,
 *            title:"researcher",
 *            salary:167000,
 *            equity:"0.020",
 *            companyName:"Ayala-Buchanan"
 *            },...
 *         ]
 *
 * {CompanyDetail, JobList} -> JobCardList -> JobCard
 */
function JobCardList({ jobs }) {
  return (
    <div className="List">
      {jobs.map(job => <JobCard
      key={job.id} companyName={job.companyName} job={job} />)}
    </div>
  );
}

export default JobCardList;