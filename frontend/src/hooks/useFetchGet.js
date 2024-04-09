import { useState} from "react";
import {useNavigate } from "react-router-dom"
import axios from "axios";
import setAuthToken from "../Components/SetAuthToken";

const useFetchGet = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const getrequest = async (url) => {
    console.log(url);
    const token = localStorage.getItem("token");
    setAuthToken(token);
    axios.get(url)
      .then(res => {
        console.log(res);
        if(res.data !== "Error Occured!!!"){
          if(res.data.data.length !== 0)
            setIsPending(false);
          else 
            setIsPending(true);
        }else{
          setIsPending(true);
        }
        setData(res.data.data);
        setError(false);
      })
      .catch(error => {
        localStorage.clear();
        navigate("/Signin");
        setIsPending(false);
        setError(true);
      });  
    }
    return [getrequest, data, isPending, error];
}
export default useFetchGet;