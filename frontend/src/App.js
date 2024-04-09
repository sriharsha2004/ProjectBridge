import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom'

import Home from './Components/home';
import Signup from './Components/signup';
import AboutUs from './Components/aboutus';
import Signin from './Components/signin';
import StudentHome from './Components/student/StudentHome';
import ProjectPost from './Components/student/ProjectPost';
import Ideas from './Components/student/Ideas';
import EntrHome from './Components/Entrepreneur/EntrHome';
import SEIdeas from './Components/Entrepreneur/SEIdeas';
import AddProject from './Components/Entrepreneur/AddProject';
import Investorpostform from './Components/Entrepreneur/Investorpostform';
import InvestmentAppeals from './Components/Entrepreneur/InvestmentAppeals';
import InvestorHome from './Components/Investor/InvestorHome';
import Investments from './Components/Investor/Investments';
import Notfound from './Components/Notfound';
import Tieups from './Components/student/Tieups';
import ETieups from './Components/Entrepreneur/ETieups';

import { RoleProvider, useRole } from './RoleContext'
import Forgetpwd from './Components/others/forgetpwd';

function App() {
  // const [getToken,r] = useGetRole();
  // const [role, setRole] = useState();


  // useEffect(()=>{
  // getToken("http://localhost:8081/verifytoken")
  // setRole(r)
  //     if(r != undefined){
  //       console.log(r);
  //       setRole(r);
  //     }
  // },[r,window.location.pathname])

  const {role , setRole} = useRole();
  console.log(role);

  return (
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/SignUp" element={<Signup/>}/>
          <Route path="/SignIn" element={<Signin/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/forget-password" element={<Forgetpwd/>} />

          {role === "Student" && (
            <>
              <Route path="/StudentHome" element={<StudentHome />} />
              <Route path="/post/:id" element={<ProjectPost />} />
              <Route path="/studentIdeas" element={<Ideas />} />
              <Route path="/studentTieups" element={<Tieups />} />
            </>
          )}
          { role === "Entrepreneur" &&  (
            <>
              <Route path="/EntrepreneurHome" element={<EntrHome />} />
              <Route path="/EstudentIdeas" element={<SEIdeas/>}/>
              <Route path="/Addproject" element={<AddProject/>}/>
              <Route path="/InvestorPost/:id" element={<Investorpostform/>}/>
              <Route path="/Entrposts" element={<InvestmentAppeals/>}/>
              <Route path="/EntrTieups" element={<ETieups/>}/>
            </>
          )} 
          {role === "Investor" && (
            <>
              <Route path="/InvestorHome" element={<InvestorHome/>}/>
              <Route path="/Invests" element={<Investments/>}/>
            </>
          )}
          
            <Route path="*" element={<Notfound/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
