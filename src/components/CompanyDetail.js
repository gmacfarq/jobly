import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import JoblyApi from '../api';
import "../stylesheets/CompanyDetail.css"
import "../stylesheets/list.css"
import JobCardList from './JobCardList';
import Loader from './Loader';
/** Component to render Company Details
 *
 *  state:
 *  - company (object containing company info)
 *    e.g. {handle:"ayala-buchanan",
 *          name:"Ayala-Buchanan",
 *          description:"Make radio physical",
 *          numEmployees:309,
 *          logoUrl:null,
 *          jobs:[{id:99,title:"Operational researcher",salary:167000,equity:"0.020"},...]
 *          }
 *
 *  effect:
 *  - on mount
 *    fetchCompany()
 *
 *  RoutesList -> CompanyDetail -> {Loader, JobCardList}
 */
function CompanyDetail(){
  const [company, setCompany] = useState({
    data: null,
    isLoading: true
  })
  const { handle } = useParams();

  useEffect(function fetchCompanyWhenMounted(){
    async function fetchCompany(){
      const result = await JoblyApi.getCompany(handle)
      setCompany({
        data: result,
        isLoading: false
      })
    }
    fetchCompany();
    }, [ handle ]);

  if(company.isLoading) return (<Loader/>)

  console.log(company)
  return(
    <div className="List">
      <div className="CompanyDetail">
        <h2>{company.data.name}</h2>
        <p>{company.data.description}</p>
      </div>
      <div>

        <JobCardList jobs={company.data.jobs}/>
      </div>
    </div>
  )
}

export default CompanyDetail