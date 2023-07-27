import axios from "axios";

const getXSRFToken = () => localStorage.getItem('XSRFTOKEN');

export const logout = async (userId: string) => {
  return await axios.post("/api/user/logout", { userId }, {
    headers: {
      Authorization: `Bearer ${getXSRFToken()}`
    }
  });
}