import React from 'react';
import { useEffect } from 'react';

import Navbar from './navbar';
import useFetchGetparams from '../../hooks/useFetchGetparams';
import "../../stylesheets/entrepreneur/projects.css"
import UseGetToken from '../../hooks/useGetToken';



const EntrHome = () => {

    const [getrequest , data , isPending , error ] = useFetchGetparams();
    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequest(`http://localhost:8081/Projects/${tokendata}`);
        }
    },[tokendata])

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
