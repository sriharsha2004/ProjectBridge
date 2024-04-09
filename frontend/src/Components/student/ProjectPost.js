import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useLocation } from 'react-router-dom';

import useFetchpost from '../../hooks/useFetchpost';
import Navbar from './navbar';
import UseGetToken from '../../hooks/useGetToken';

import "../../stylesheets/student/projectpost.css"

const ProjectPost = () => {
    const [name, setName] = useState('');
    const [idea, setIdea] = useState('');
    const [ProjectId,setProjectId] = useState("");
    const [projectName, setProjectName] = useState('');
    const [mailId, setMailId] = useState('');
    const [smailId, setsMailId] = useState('');
    const [projectDescription,setprojectDescription] = useState("");
    const [image, setImage] = useState(null);
    const [getToken,tokendata] = UseGetToken();

    const location = useLocation();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){                
            var obj = location.state.formData;

            const storedProjectId = obj._id;
            const storedProjectName = obj.Projectname;
            const storedEnMailId = obj.mailId;
            const storedprojectDescription = obj.projectDescription;
            
            setProjectId(storedProjectId);
            setprojectDescription(storedprojectDescription)
            setProjectName(storedProjectName);
            setMailId(storedEnMailId);
            setsMailId(tokendata);
        }
    },[tokendata])

    const [postrequest,data,isPending,error] = useFetchpost();

    const handleSubmit = (e) => {
        e.preventDefault();    
        const formdata = {
            name : name,
            projectId : ProjectId,
            projectTitle : projectName,
            projectDescription : projectDescription,
            mailId : mailId,
            smailId : smailId,
            image : image,
            Idea : idea,
        }
        
        postrequest("http://localhost:8081/Ideas/new" , formdata);
        
        // localStorage.clear();

    };


    var StoreImage = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        try {
            axios.post('http://localhost:8081/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                console.log('File uploaded successfully.');
                setImage("/images/"+res.data.filename);
            })
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    return (
        <div>
            <Navbar/>

            <div className="form-container">
                <h2>Idea Post Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Project Description:</label>
                        <input type="text" value={projectDescription} disabled />
                    </div>
                    <div>
                        <label>Idea:</label> <br />
                        <textarea value={idea} onChange={(e) => setIdea(e.target.value)} required />
                    </div>
                    <div>
                        <label>Project Name:</label>
                        <input type="text" value={projectName} disabled />
                    </div>
                    <div>
                        <label> Mail ID:</label>
                        <input type="email" value={smailId} disabled />
                    </div>
                    <div>
                        <label>Entrepreneur Mail ID:</label>
                        <input type="email" value={mailId} disabled />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
                        <button onClick={StoreImage} >Upload</button>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ProjectPost;
