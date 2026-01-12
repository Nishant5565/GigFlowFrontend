import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addNotification } from "@/features/notificationSlice";
import type { RootState } from "@/store";
import API_URL, { SOCKET_URL } from "@/config/API_URL";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    if (socket?.connected) return;

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      newSocket.emit("join", user._id);
    });

    newSocket.on("connect_error", (err) => {
      setIsConnected(false);
    });

    newSocket.on("disconnect", (reason) => {
      setIsConnected(false);
    });

    newSocket.on("notification", (notification) => {
      console.log("Received notification:", notification);

      // Show Toast
      toast(notification.message, {
        description: "Just now",
        action: {
          label: "View",
          onClick: () => console.log("View notification"), // Can add navigation logic later
        },
      });

      // Update Redux State instantly
      dispatch(addNotification(notification));
    });

    setSocket(newSocket);

    return () => {
      console.log("Cleaning up socket connection...");
      newSocket.disconnect();
    };
  }, [user, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
