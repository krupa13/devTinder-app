import io from "socket.io-client";
import { BASE_URL } from "./Constants";

//Socket Connection, it creates a connection and returns us a socket object
// Where we can send events and emit events and join a chat, etc.

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    //This is where we connect to the backend server
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
