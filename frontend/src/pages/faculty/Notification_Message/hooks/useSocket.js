import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // For demo purposes, we'll simulate socket connection
    // In production, uncomment the next line:
    // const socketInstance = io(serverPath);
    
    // Mock socket for demo
    const mockSocket = {
      on: (event, callback) => {
        console.log(`Listening for ${event}`);
      },
      emit: (event, data) => {
        console.log(`Emitting ${event}:`, data);
      },
      disconnect: () => {
        console.log('Socket disconnected');
      }
    };

    setSocket(mockSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [serverPath]);

  return socket;
};

export default useSocket;