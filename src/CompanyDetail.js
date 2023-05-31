import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import JoblyApi from './api';

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

  if(company.isLoading) return (<p> loading... </p>)

  console.log(company)
  return(
    <div>
      {`Detail about ${handle}`}
      <p>{company.data.handle}</p>
      <p>{company.data.description}</p>
    </div>
  )
}

export default CompanyDetail