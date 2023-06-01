import { useState } from "react"
import "../stylesheets/SearchForm.css"

/** Component to render and handle submission of search form
 *
 *  props:
 *  - search (function from parent component to filter search results)
 *
 *  {CompanyList, JobList} -> SearchForm
 */
function SearchForm({search}){
  const [formData, setFormData] = useState({term:""});

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(currFormData => ({
      ...currFormData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    if(formData.term.trim()){
      search(formData.term);
    }else{
      search("_");
    }

  }

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label></label>
          <input
            placeholder="Enter search term..."
            name="term"
            onChange={handleChange}
            value={formData.term}
            type="search"
            className="form-control rounded"
          />
          <button className="btn btn-outline-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm