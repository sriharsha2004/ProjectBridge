import { useState, useEffect } from "react";
import axios from "axios";

const useImageupload = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  const postimage = (url,formdata) => {
    axios.post(url, formdata,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
      .then(res => {
        if(res.data.msg === "Succesfully"){
            console.log('File uploaded successfully.');
            let imguri = "/images/"+res.data.filename;
            setData(imguri);
            // WHen i update here its updating as null due to asycnhronous nature
        }else{
          setIsPending(true);
        }
        setError(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsPending(false);
        setError(true);
      });  
    }

    useEffect(() => {
        setData(data);
    }, [data]);


    return [postimage, data, isPending, error];
}
export default useImageupload;