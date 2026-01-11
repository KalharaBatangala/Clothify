import { useEffect } from "react";
import api from "./api/axios";

function App() {
  useEffect(() => {
    api.get("/health")
      .then((res) => {
        console.log("Backend connected:", res.data);
      })
      .catch((err) => {
        console.error("Backend connection failed", err);
      });
  }, []);

  return (
    <div>
      <h1>Clothify Frontend</h1>
      <p>Check console for backend connection</p>
    </div>
  );
}

export default App;
