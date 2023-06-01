import { BrowserRouter } from 'react-router-dom';
import '../stylesheets/App.css';
import Nav from './Nav';
import RoutesList from './RoutesList';

function App() {

  function signup(data){
    console.log(data)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <RoutesList signup={signup}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
