import "../stylesheets/JobCard.css"
import convertAndFormat from "../convertAndFormat"
/** Component to render a Job Card
 *
 *  props:
 *  -job
 *    e.g. {id:99,title:"Operational researcher",salary:167000,equity:"0.020"}
 *  -companyName
 *    e.g. "Anderson, Arias and Morrow"
 *
 *  JobCardList -> JobCard
 */
function JobCard({job, companyName}){
  return (
    <div className="JobCard">
      <p><b>{job.title}</b></p>
      {companyName && <p>{companyName}</p>}
      {job.salary &&
      <div>
        <small>Salary: {convertAndFormat(job.salary)}</small>
      <br/>
      </div>
      }
      {job.equity !== "0" && job.equity &&
      <small>Equity: {job.equity}</small>
      }
    </div>
  )
}

export default JobCard