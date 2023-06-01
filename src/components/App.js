import { useEffect, useState } from 'react';
import userContext from './userContext';
import { BrowserRouter } from 'react-router-dom';
import '../stylesheets/App.css';
import Nav from './Nav';
import RoutesList from './RoutesList';
import JoblyApi from '../api';
import jwt_decode from "jwt-decode";
import useLocalStorage from './useLocalStorage';
import Loader from './Loader';

/** App component
 *
 *  state:
 *  -token (custom state hook for localStorage)
 *  -currUser (state object of currently logged in user)
 *    e.g. {
 *          data: {
 *                username:
 *
 *                }
 *          isLoading: true
 *          }
 *
 *  effects:
 *  -when mounted fetchUser()
 *
 *  App -> {RoutesList, Nav}
 */
function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [currUser, setCurrUser] = useState({
    data: null,
    isLoaded: false
  });

  /** On mount or token change fetch user data using token*/
  useEffect(function fetchUserOnMountAndTokenChange() {
    async function fetchUser() {
      const username = jwt_decode(token).username;
      JoblyApi.token = token;
      try{
        const result = await JoblyApi.getUser(username);
        setCurrUser({
          data: result,
          isLoaded: true,
        });
      }
      catch(err){
        alert(err)
        setCurrUser({
          data: null,
          isLoaded: true,
        });
      }
    }

    if (token) {
      fetchUser();
    } else {
      setCurrUser({
        data: null,
        isLoaded: true,
      });
    }

  }, [token]);

  /** Set token using API signup */
  async function signup(userData) {
    const result = await JoblyApi.signupUser(userData);
    setToken(result);
  }

  /** Set token using API login */
  async function login(userData) {
    const result = await JoblyApi.loginUser(userData);
    setToken(result);
  }

  /** Set token using API login */
  async function update(userData) {
    const result = await JoblyApi.updateUser(userData);
    setCurrUser({
      data: result,
      isLoaded: true
    })
  }

  /** reset token and currUser */
  function logout() {
    JoblyApi.token = "";
    setToken(null);
    setCurrUser({
      data: null,
      isLoaded: true,
    });
  }

  if (!currUser.isLoaded) return (<Loader />)

  return (
    <div className="App">
      <userContext.Provider value={{ currUser }}>
        <BrowserRouter>
          <Nav logout={logout} />
          <RoutesList currUser={currUser.data} signup={signup} login={login} update={update} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
