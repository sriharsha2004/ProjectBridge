import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './navbar';
import useFetchGet from '../../hooks/useFetchGet';
import "../../stylesheets/student/studenthome.css"


const StudentHome = () => {

    const [getrequest , data , isPending , error ] = useFetchGet();

    const navigate = useNavigate();

    useEffect(() => {
        getrequest("http://localhost:8081/Projects/all");
    }, [])

    var handlePostIdea = (project) => {
        navigate(`/post/${project._id}` , { state : {formData : project} })
    }
    
    return (
        <div>
            <Navbar />
            <div className="student-home-container">
            <h2>All Projects</h2>
            {!isPending && !error && (
                <div className="projects-container">
                {data.map(project => (
                    <div key={project._id} className="project-item">
                        <div className="project-image">
                            <img src={`http://localhost:8081${project.imageUrl}`} alt="Project Image" />
                        </div>
                        <div className="project-details">
                            <h3><strong>Project Name :</strong> {project.Projectname}</h3>
                            <p><strong>Mail ID:</strong> {project.mailId}</p>
                            <p><strong>Industry:</strong> {project.industry}</p>
                            <p><strong>Description:</strong> {project.projectDescription}</p>
                            <button onClick={() => handlePostIdea(project)}>Post Idea</button>
                        </div>
                    </div>
                ))}
                </div>
            )}
            {error && <p className="error-message">Error Occurred</p>}
            {isPending && <p className="pending-message">Signing in...</p>}
        </div>
        </div>
    );
}

export default StudentHome;
