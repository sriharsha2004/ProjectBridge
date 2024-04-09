import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useFetchGetparams from '../../hooks/useFetchGetparams';
import UseGetToken from '../../hooks/useGetToken';

import Navbar from './navbar';
import "../../stylesheets/entrepreneur/Studentresponses.css"

const SEIdeas = () => {

    const [getrequest , data , isPending , error ] = useFetchGetparams();

    const navigate = useNavigate();
    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequest(`http://localhost:8081/Ideas/${tokendata}`);
        }
    },[tokendata])

    var handlePostToInvestor = (idea) =>{
        navigate(`/InvestorPost/${idea._id}` , {state : { formData : idea } });
    }

    return (
        <div>
            <Navbar/>
            <div className="ideas-container">
            { data && data.map(idea => (
                <div className="idea-item" key={idea._id}>
                    <h3><strong>Project Name : </strong>{idea.projectTitle}</h3>
                    <img src={`http://localhost:8081${idea.image}`} alt="Project Image" />
                    <div className="idea-details">
                    <p><strong>Student Name : </strong>{idea.name}</p>
                    <p><strong>Student mailId : </strong>{idea.smailId}</p>
                    <p><strong>Description :</strong> {idea.projectDescription}</p>
                    <p><strong>Student Idea :</strong> {idea.Idea}</p>
                    <button onClick={() => handlePostToInvestor(idea)}>Post To Investor</button>
                    </div>
                </div>
             ))}
            {isPending && <p className='pending-message'>No Ideas Found</p>}
            {error && <p className='error-message'>Could Not fetch the data from the server</p>}
            </div>
        </div>
    );
}

export default SEIdeas;
