import { useEffect, useState } from 'react';
import axios from 'axios';

import setAuthToken from '../Components/SetAuthToken';

const useGetToken = () => {
    const [role,setrole] = useState();

    const getToken = (url) =>{
        const token = localStorage.getItem("token");
        setAuthToken(token);
        axios.get(url)
        .then((res)=>{
            if(res.data.msg === "Success"){
                setrole(res.data.decoded.role);
            }else{
                // navigate("/Signin");
            }
        })
        .catch(()=>{
            // navigate("/Signin");
        })
    }

    useEffect(()=>{
        setrole(role);
    } , [role])

    return [getToken,role];
}

export default useGetToken;
