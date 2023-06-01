import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all companies
   *  with no query, get all companies
   *  with query, filter by company name
   */
  static async getAllCompanies(query) {
    let res = await this.request(`companies/?nameLike=${query}`);
    return res.companies;
  }

  /** Get details on all jobs
   *  with no query, get all jobs
   *  with query, filter by job title
   */
  static async getAllJobs(query) {
    let res = await this.request(`jobs/?title=${query}`);
    return res.jobs;
  }

  /** Get user details */
  static async getUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get JWT via user register */
  static async signupUser(userData){
    let res = await this.request(`auth/register`, userData, "POST");
    //console.log(res.token);
    return res.token;
  }

  /** Get JWT via user login  */
  static async loginUser(userData){
    let res = await this.request(`auth/token`, userData, "POST");
    return res.token;
  }

  /** update user info  */
  static async updateUser(userData){
    let updateData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email
    }//TODO: Seperate these in form rather than api
    console.log(updateData)
    let res = await this.request(`users/${userData.username}`, updateData, "PATCH");
    return res.user;
  }

}

export default JoblyApi
