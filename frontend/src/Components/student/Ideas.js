import React, { useEffect, useState } from 'react';

import useFetchGetparams from '../../hooks/useFetchGetparams';
import Navbar from './navbar';
import UseGetToken from '../../hooks/useGetToken';

import "../../stylesheets/student/Allideas.css"

const Ideas = () => {
    
    const [getrequest,data,isPending,error] = useFetchGetparams();
    const [getToken,tokendata] = UseGetToken();

    const [selectedProject, setselectedProject] = useState(null);

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequest(`http://localhost:8081/Ideas/all/${tokendata}`);
        }
    },[tokendata])

    const openModal = (project) => {
        setselectedProject(project);
    };

    const closeModal = () => {
        setselectedProject(null);
    };
    

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
                        <button onClick={() => openModal(idea)} data-bs-toggle="modal" data-bs-target={`#exampleModal-${idea._id}`} id='viewer'>View Idea</button>
                    </div>

                    {/* modal */}
                    <div className="modal fade" id={`exampleModal-${idea._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel-${idea._id}`} aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{idea.projectTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="modal-image">
                                                <img src={`http://localhost:8081${idea.image}`} alt="Project Image" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="modal-info">
                                                <p><strong>Industry:</strong> {idea.industry}</p>
                                                <p><strong>Description:</strong> {idea.projectDescription}</p>
                                                <p><strong>Your Idea:</strong> {idea.Idea}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
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
