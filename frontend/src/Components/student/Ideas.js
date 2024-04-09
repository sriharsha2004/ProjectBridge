import React, { useEffect, } from 'react';

import useFetchGetparams from '../../hooks/useFetchGetparams';
import Navbar from './navbar';
import UseGetToken from '../../hooks/useGetToken';

import "../../stylesheets/student/Allideas.css"

const Ideas = () => {
    
    const [getrequest,data,isPending,error] = useFetchGetparams();
    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequest(`http://localhost:8081/Ideas/all/${tokendata}`);
        }
    },[tokendata])


    return (
        <div>
            <Navbar/>
             <div className="ideas-container">
            <h1>Your Ideas</h1>
            {data && data.map(idea => (
                <div className="idea-item" key={idea._id}>
                    <img src={`http://localhost:8081${idea.image}`} alt="Project Image" />
                    <div className="idea-details">
                        <h3><strong>Project Name : </strong>{idea.projectTitle}</h3>
                        <p><strong>Mail ID:</strong> {idea.mailId}</p>
                        <p><strong>Idea :</strong> {idea.Idea}</p>
                    </div>
                </div>
             ))}
            {isPending && <p className="pending-message"> No Ideas Found </p>}
            {error && <p className="error-message">Could Not fetch the data from the server</p>}
        </div>
        </div>
    );
}

export default Ideas;
