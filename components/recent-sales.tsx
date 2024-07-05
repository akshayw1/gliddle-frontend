import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState,useEffect,useCallback,useRef,useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import io from "socket.io-client"; 

const socket = io("http://localhost:9002"); // Connect to your backend socket server


// interface Log {
//   timestamp: string;
//   title: string;
//   log?: string; // Optional if logs include additional message content
// }
interface LiveLogsProps {
  projectId: string; // Define projectId prop
}
// const firaCode = Fira_Code({ subsets: ["latin"] });

export const LiveLogs: React.FC<LiveLogsProps> = ({ projectId }) => {
  // const [logs, setLogs] = useState<Log[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [building,setbuilding] = useState(true);
  // const [logs, setLogs] = useState<Log[]>([]);
  // let arr: Log[] = [];
  const logContainerRef = useRef<HTMLElement>(null);
  
  
  const handleSocketIncommingMessage = useCallback((message: string) => {
    console.log(`[Incomming Socket Message]:`, typeof message, message);
    const { log } = JSON.parse(message);
    if(log.startsWith(`Build Proceess Completed for ${projectId}`)){
      setbuilding(false);
      toast.success(`Build Proceess Completed for ${projectId}`)
    
    }
    
     
      setLogs((prev) => [...prev, log]);
      logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      console.log(logs);
    
   
  }, []);

  useEffect(() => {
    // Subscribe to logs related to projectId
    console.log(`Subscribing to logs:${projectId}`);
    socket.emit("subscribe", `logs:${projectId}`);

    socket.on("message",handleSocketIncommingMessage);

    return () => {
      // Clean up socket connection
      socket.emit("unsubscribe", `logs:${projectId}`);
      socket.off("message");
    };
  }, [projectId]); 
  return (
    <div className="space-y-8 overflow-scroll h-[30rem]">
      <Toaster/>

{logs.length ? (
          <div
            className={`text-sm text-green-500 logs-container mt-5 border-green-500 border-2 rounded-lg p-4 h-[1000px] overflow-y-auto`}
          >
            <pre className="flex flex-col gap-1">
              {logs.map((log, i) => (
                <code
                  ref={logs.length - 1 === i ? logContainerRef : undefined}
                  key={i}
                >{`> ${log}`}</code>
              ))}
            </pre>
          </div>
        ) : (<div> Deployment Started... Listening for logs</div>)  }
    </div>

    
  );
}
