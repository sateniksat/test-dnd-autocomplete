
import axios from "axios";

class API {
  constructor() {
    this.http = axios.create({
      baseURL: "",
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
        Accept: "application/json"
      }
    });

    this.configuration();
  }

  configuration() {
    this.http.interceptors.request.use(
      (config) => {
        // add `access token` if it exists
        
        const token=localStorage.getItem('token');
        if(token){
          config.headers['Authorization']=`${token}`
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // if we encounter error 401
        // call `refresh token` api which has two modes:
        // 1. 200 => we get new `access token` & `refresh token`
        // 2. 403 (FORBIDDEN) => redirect to login page
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    return this.http.get(url, config);
  }

  post(url, data, config) {
    return this.http.post(url, data, config);
  }

  patch(url, data, config) {
    return this.http.patch(url, data, config);
  }

  put(url, data, config) {
    return this.http.put(url, data, config);
  }

  delete(url, config) {
    return this.http.delete(url, config);
  }

  postFormData(url, formData, config) {
    return this.http.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      ...config
    });
  }
}

export const api = new API();

export default API;
