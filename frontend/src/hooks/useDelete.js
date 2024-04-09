import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import setAuthToken from "../Components/SetAuthToken";


const useDelete = () => {
    const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const deleterequest = (url) => {
    console.log(url);
    setAuthToken(localStorage.getItem("token"));
    axios.delete(url)
      .then(res => {
        if(res.data !== "Not Found!!!"){
          console.log(res.data);
          if(res.data.length !== 0){
            setIsPending(false);
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
    return [deleterequest, data, isPending, error];
}

export default useDelete;
