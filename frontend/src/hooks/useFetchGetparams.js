import { useState} from "react";
import axios from "axios";

const useFetchGetparams = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);


  const getrequest = (url) => {
    console.log(url);
    axios.get(url)
      .then(res => {
        if(res.data !== "Error Occured!!!"){
          console.log(res.data);
          if(res.data.length !== 0){
            setIsPending(false);
          }
          else 
            setIsPending(true);
        }else{
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
    return [getrequest, data, isPending, error];
}
export default useFetchGetparams;