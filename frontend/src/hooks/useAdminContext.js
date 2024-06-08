import { AdminContext } from "../context/AdminContext";
import { useContext } from "react";

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw Error('useAuthContext must be used inside an useAuthContextProvider')
    }

    return context
}