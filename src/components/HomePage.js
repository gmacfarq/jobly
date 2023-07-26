import { useContext } from "react";
import "../stylesheets/HomePage.css"
import userContext from "./userContext";
/** Component to render Home Page for Jobly
 *
 * RoutesList -> HomePage
 */
function HomePage(){

  const {currUser} = useContext(userContext)
  return(
    <div className="home-page">
      <h1>Welcome to  Jobly
        {currUser.data && <h1>{currUser.data.firstName} {currUser.data.lastName}</h1>}
      </h1>
    </div>
  )
}

export default HomePage