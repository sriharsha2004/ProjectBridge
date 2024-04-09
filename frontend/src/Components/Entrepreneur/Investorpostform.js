import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useFetchpost from '../../hooks/useFetchpost';
import useImageupload from '../../hooks/useImageupload';
import UseGetToken from '../../hooks/useGetToken';
import Navbar from './navbar';

import "../../stylesheets/student/projectpost.css"


const Investorpostform = () => {
    const [Entname, setEntname] = useState('');
    const [Studname,setStudname] = useState("");
    const [idea, setIdea] = useState('');
    const [projectId,setprojectId] = useState("");
    const [ideaId,setideaId] = useState("");
    const [projectName, setProjectName] = useState('');
    const [mailId, setMailId] = useState('');
    const [smailId, setsMailId] = useState('');
    const [imailId,setimailId] = useState("");
    const [projectDescription,setprojectDescription] = useState("");
    const [cost,setcost] = useState("");
    const [image, setImage] = useState(null);

    const location = useLocation();

    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            var obj = location.state.formData

            const storedIdeaId = obj._id;
            const storedprojectId = obj.projectId;
            const storedStudentName = obj.name;
            const storedProjectName = obj.projectTitle;
            const storedprojectDescription = obj.projectDescription;
            const storedMailId = obj.smailId;
            const storedIdea = obj.Idea;

            setprojectId(storedprojectId);
            setideaId(storedIdeaId);
            setStudname(storedStudentName);
            setprojectDescription(storedprojectDescription)
            setProjectName(storedProjectName);
            setMailId(tokendata);
            setsMailId(storedMailId);
            setIdea(storedIdea);
        }
    },[tokendata])

    const [postrequest,data,isPending,error] = useFetchpost();
    const [postimage,imgurl,ispend,err] = useImageupload();

    const handleSubmit = (e) => {
        e.preventDefault();    
        const formdata = {
            projectId : projectId,
            IdeaId : ideaId,
            studentname : Studname,
            entrname : Entname,
            projectName : projectName,
            projectDescription : projectDescription,
            projectIdea : idea,
            studentmail : smailId,
            Entrmail : mailId,
            investormail : imailId,
            estimatedcost : cost,
            ImageUrl : image
        }
        
        postrequest("http://localhost:8081/EntrtoInv/postCost" , formdata);
        
    };


    var StoreImage = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        postimage("http://localhost:8081/upload" , formData);
        setImage(imgurl)
    }

    useEffect(() => {
        setImage(imgurl);
    } , [imgurl])

    return (
        <div>
            <Navbar/>

            <div className="form-container">
                <h2>Investor Post Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={Entname} onChange={(e) => setEntname(e.target.value)} required />
                    </div>
                    <div>
                        <label>Student Name:</label>
                        <input type="text" value = {Studname} disabled />
                    </div>
                    <div>
                        <label>Project Name:</label>
                        <input type="text" value={projectName} disabled />
                    </div>
                    <div>
                        <label>Project Description:</label>
                        <input type="text" value={projectDescription} disabled />
                    </div>
                    <div>
                        <label>Idea:</label> <br />
                        <textarea value={idea}  disabled />
                    </div>
                    <div>
                        <label>Mail ID:</label>
                        <input type="email" value={mailId} disabled />
                    </div>
                    <div>
                        <label>Student Mail ID:</label>
                        <input type="email" value={smailId} disabled />
                    </div>
                    <div>
                        <label>Investor Mail ID:</label>
                        <input type="email" value={imailId} onChange={(e) => setimailId(e.target.value)} />
                    </div>
                    <div>
                        <label>Enter the Estimated cost:</label>
                        <input type="text" value={cost} onChange={(e) => setcost(e.target.value)} />
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

export default Investorpostform;
