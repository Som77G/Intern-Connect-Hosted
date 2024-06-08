import { io } from "socket.io-client";
import { useAdminContext } from "./hooks/useAdminContext";
let socket; // Declare a variable to store the socket instance

const createSocketInstance = () => {
  const {user}= useAdminContext();

  return io("http://localhost:3000", {
    autoConnect: false,
    withCredentials: true,
    query: {
      username: user.username,
      message: null,
      userType: user.userType
    },
  });
};

const getSocketInstance = () => {
  if (!socket) {
    // If the socket instance doesn't exist, create it
    socket = createSocketInstance();
  }

  return socket;
};

export default getSocketInstance;
