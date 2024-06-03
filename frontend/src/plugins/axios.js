// axios
import axios from "axios";
const Domain = process.env.VUE_APP_Backed_API;
var CycAxios = axios.create({
  baseURL: Domain,
  withCredentials: true,
});

function getCookie(name) {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith(name + "="));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split("=")[1]);
}

CycAxios.interceptors.request.use(function (config) {
  var csrfToken = getCookie("csrftoken");
  config.headers["X-CSRFToken"] = csrfToken;
  return config;
});

export default CycAxios;

