import { setAuthState } from "@/store/authSlice"
import { useDispatch } from "react-redux"
import { json } from "stream/consumers"
export const saveAuth = (auth: object, xsrfToken: string) => {
  localStorage.setItem('AUTH', JSON.stringify(auth))
  localStorage.setItem('XSRFTOKEN', xsrfToken);
}
export const getAuth = () => {
  const authString = localStorage.getItem("AUTH");
  let auth = null;
  if (!authString) return null
  try {
    auth = JSON.parse(authString);
  } catch (error) {
    auth = null;
  }
  return auth ? auth : null;
}

export const getXSRFToken = () => {
  return localStorage.getItem('XSRFTOKEN')
}
export const cleanLocalStorage = () => {
  localStorage.removeItem('AUTH');
  localStorage.removeItem('XSRFTOKEN');

}