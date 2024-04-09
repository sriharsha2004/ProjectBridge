import { createContext, useContext, useState , useEffect} from 'react';
import useGetRole from './hooks/useGetRole';

const RoleContext = createContext();


export const RoleProvider = ({ children }) => {
   const [getToken,r] = useGetRole();
  // const [role, setRole] = useState();


  useEffect(()=>{
    getToken("http://localhost:8081/verifytoken")
    setRole(r)
        if(r != undefined){
          console.log(r);
          setRole(r);
        }
  },[r])

  const [role, setRole] = useState(() => {
      return r;
  });

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
