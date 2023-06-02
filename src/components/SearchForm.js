import { useState } from "react"
import "../stylesheets/SearchForm.css"
import _ from "lodash"

/** Component to render and handle submission of search form
 *
 *  props:
 *  - search (function from parent component to filter search results)
 *
 *  {CompanyList, JobList} -> SearchForm
 */
function SearchForm({search}){
  const [formData, setFormData] = useState({term:""});
  const [typingTimer, setTypingTimer] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(currFormData => ({
      ...currFormData,
      [name]: value,
    }));

    clearTimeout(typingTimer);

    setTypingTimer(setTimeout(() => {
      value.trim() ? search(value) : search("_");
    }, 1000));
  }

  return (
    <div className="search-form">
      {/* <form onSubmit={handleSubmit}> */}
      <form>
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
        </div>
      </form>
    </div>
  )
}

export default SearchForm