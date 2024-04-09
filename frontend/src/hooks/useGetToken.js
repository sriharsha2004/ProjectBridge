import  { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import setAuthToken from '../Components/SetAuthToken';

const UseGetToken = () => {
    const [data,setdata] = useState();

    const navigate = useNavigate();

    const getToken = (url) =>{
        const token = localStorage.getItem("token");
        setAuthToken(token);
        axios.get(url)
        .then((res)=>{
            console.log(res);
            if(res.data.msg === "Success"){
                setdata(res.data.decoded.mail);
            }else{
                navigate("/Signin");
            }
        })
        .catch(()=>{
            navigate("/Signin");
        })
    }

    useEffect(()=>{
        setdata(data);
    } , [data])

    return [getToken,data];
}

export default UseGetToken;
