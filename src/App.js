import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import RoutesList from './RoutesList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <RoutesList/>
      </BrowserRouter>
    </div>
  );
}

export default App;
