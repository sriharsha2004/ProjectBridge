import React from 'react';
import { useEffect } from 'react';

import { useState } from 'react';

import Navbar from './navbar';
import useFetchGetparams from '../../hooks/useFetchGetparams';
import "../../stylesheets/entrepreneur/projects.css"
import UseGetToken from '../../hooks/useGetToken';



const EntrHome = () => {

    const [getrequest , data , isPending , error ] = useFetchGetparams();
    const [getToken,tokendata] = UseGetToken();

    const [selectedProject, setselectedProject] = useState(null);

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequest(`http://localhost:8081/Projects/${tokendata}`);
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
            <div className="student-home-container">
            <h2>All Projects</h2>
            {!isPending && !error && (
                <div className="projects-container">
                { data && data.map(project => (
                    <div key={project._id} className="project-item">
                        <div className="project-image">
                            <img src={`http://localhost:8081${project.imageUrl}`} alt="Project Image" />
                        </div>
                        <div className="project-details">
                            <h3><strong>Project Name : </strong>{project.Projectname}</h3>
                            <p><strong>Industry : </strong> { project.industry }</p>
                            <p><strong>Description :</strong> {project.projectDescription}</p>
                            <button onClick={() => openModal(project)} data-bs-toggle="modal" data-bs-target={`#exampleModal-${project._id}`} id='viewer'>View Details</button>
                        </div>

                        {/* modal */}
                        <div className="modal fade" id={`exampleModal-${project._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel-${project._id}`} aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{project.Projectname}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="modal-image">
                                                <img src={`http://localhost:8081${project.imageUrl}`} alt="Project Image" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="modal-info">
                                                <p><strong>Mail ID:</strong> {project.mailId}</p>
                                                <p><strong>Industry:</strong> {project.industry}</p>
                                                <p><strong>Description:</strong> {project.projectDescription}</p>
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
                </div>
            )}
            {error && <p className="error-message">Error Occurred</p>}
            {isPending && <p className="pending-message">No proposals Found...</p>}
            </div>
        </div>
    );
}

export default EntrHome;
