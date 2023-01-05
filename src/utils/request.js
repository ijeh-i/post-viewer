import axios from "axios";

const fetch = (options) => {
    
  let { method = "get", data, url, formatData } = options;
  if (formatData && method.toLowerCase() !== "get") {
    data = {
      meta: { source: "web" },
      data: data,
    };
  }

  switch (method.toLowerCase()) {
    case "get":
      return axios.get(url, {
        params: data,
      });
    case "delete":
      return axios.delete(url, {
        data: data,
      });
    case "post":
      switch (options.upload) {
        case true:
          return axios.post(url, options.formData, options.config);
        default:
          return axios.post(url, data);
      }
    case "put":
      return axios.put(url, data);
    case "patch":
      return axios.patch(url, data);
    default:
      return axios(options);
  }
};

export default function request(options) {
  return fetch(options)
    .then((response) => {
      const { statusText, status, headers } = response;
      let data =
        options.fetchType === "YQL"
          ? response.data.query.results.json
          : response.data;
      return {
        headers: headers,
        success: true,
        message: statusText,
        statusCode: status,
        raw: data,
        ...data,
      };
    })
    .catch((err) => {
      const { response } = err;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        if (statusCode === 4038) {
          localStorage.clear();
          let origin = window.location.origin;
          window.location.replace(origin);
        }
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = err.message || "Network Error";
      }

      return {
        success: false,
        statusCode,
        message: response?.data?.meta?.info ? response?.data?.meta?.info : msg,
        raw: response?.data,
        meta: response?.data?.meta,
      };
    });
}
