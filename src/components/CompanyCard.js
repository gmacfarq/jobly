import "../stylesheets/CompanyCard.css"
/** Component to render a Company Card
 *
 *  props:
 *  -company
 *    e.g. {handle:"ayala-buchanan",
 *          name:"Ayala-Buchanan",
 *          description:"Make radio physical",
 *          numEmployees:309,
 *          logoUrl:null,
 *          jobs:[{id:99,title:"Operational researcher",salary:167000,equity:"0.020"},...]
 *          }
 *
 *  CompanyList -> CompanyCard
 */
function CompanyCard({company}){
  return (
    <div className="CompanyCard card">
      <p><b>{company.name}</b></p>
      {company.logoUrl && <img src={company.logoUrl} alt="logo"/> }
      <br/>
      <p>{company.description}</p>

    </div>
  )
}

export default CompanyCard