import { useState} from "react";
import {useNavigate , useLocation } from "react-router-dom"
import axios from "axios";

import setAuthToken from "../Components/SetAuthToken";

import { useRole } from "../RoleContext";


const useFetchpost = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location  = useLocation();
  const { role , setRole } = useRole();

  const postrequest = (url,formdata) => {
    setAuthToken(localStorage.getItem('token'));
    axios.post(url, formdata)
      .then(res => {
        if(res.data.msg === "Succesfully"){
          setIsPending(false);
          console.log(formdata.role);
          console.log(url);
          if(location.pathname === "/SignUp") navigate("/Signin");
          else if(location.pathname ==="/Signin"){
            localStorage.setItem("token",res.data.token);
            if(formdata.role === "Student"){
              setRole("Student");
              navigate("/StudentHome");
            }
            else if(formdata.role === "Entrepreneur"){
              setRole("Entrepreneur");
              navigate("/EntrepreneurHome");
            }
            else {
              setRole("Investor");
              navigate("/InvestorHome");
            }

          }
          else if(location.pathname.startsWith("/post")) navigate("/StudentHome")
          else if(location.pathname === "/Addproject") navigate("/EntrepreneurHome")
          else if(location.pathname.startsWith("/InvestorPost")) navigate("/Entrposts")

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
    return [postrequest, data, isPending, error];
}
export default useFetchpost;