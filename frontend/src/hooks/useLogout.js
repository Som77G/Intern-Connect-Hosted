import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "./useAdminContext";

const PORT = import.meta.env.VITE_DOMAIN;
export const useLogout = () => {
    const navigate = useNavigate()
    const { dispatch } = useAdminContext();

    const logout = async () => {
        try {
          const res = await axios.get(`${PORT}/api/user/logout`)
          dispatch({ type: "LOGOUT" });
          navigate('/')
          console.log(res.data)
    
        } catch (error) {
          console.log(error.message);
        }
      }
    return {logout}
}