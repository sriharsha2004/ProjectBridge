import { useState} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import setAuthToken from "../Components/SetAuthToken";

const useUpdate = () => {
    const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const updaterequest = (url) => {
    console.log(url);
    setAuthToken(localStorage.getItem("token"));
    axios.put(url)
      .then(res => {
        if(res.data !== "Error Occured!!!"){
          console.log(res.data);
          if(res.data.length !== 0){
            setIsPending(false);
            navigate("/Invests");
          }
          else 
            setIsPending(true);
        }else{
          navigate("/Signin");
          setIsPending(true); 
        }
        setData(res.data);
        setError(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsPending(false);
        setError(true);
      });  
    }
    return [updaterequest, data, isPending, error];
}

export default useUpdate;
