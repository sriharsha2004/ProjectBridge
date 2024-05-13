import React from 'react';
import { useState , useEffect } from 'react';

import useImageupload from '../../hooks/useImageupload';
import useFetchpost from '../../hooks/useFetchpost';
import Navbar from "./navbar";
import UseGetToken from '../../hooks/useGetToken';

import "../../stylesheets/student/projectpost.css"

const AddProject = () => {

    const [industry, setindustry] = useState('');
    const [projectName, setProjectName] = useState('');
    const [Description,setDescription] = useState("");
    const [mailId, setMailId] = useState('');
    const [image, setImage] = useState(null);

    const[showimage,setshowimage] = useState("https://media.licdn.com/dms/image/C4E12AQG2pj4JkZG0Yw/article-cover_image-shrink_600_2000/0/1520115601955?e=2147483647&v=beta&t=15dJ3ErnJfshcaCF1pn0x_PZO4-UeIeYayT1JR_1HY8");

    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            setMailId(tokendata);
        }
    },[tokendata])

    const [postimage , data , isPending , error] = useImageupload();
    const [postrequest,response,ispend,err] = useFetchpost();

    var StoreImage = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        postimage("http://localhost:8081/upload" , formData);
        setImage(data);
    }

    useEffect(() => {
       setImage(data);
    }, [data]);

    var handleSubmit = (e) =>{
        e.preventDefault();
        const formdata = {
            Projectname : projectName,
            mailId : mailId,
            industry : industry,
            projectDescription:Description,      
            imageUrl : image,
            
        }
        postrequest("http://localhost:8081/Projects/new",formdata)
    }

    return (
        <div>
            <Navbar/>
            <div className='form-container'>
            <h2>Project Post Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Project Name:</label>
                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} required/>
                </div>
                <div>
                    <label>Industry:</label>
                    <textarea value={industry} onChange={(e) => setindustry(e.target.value)} required />
                </div>
                <div>
                    <label>Mail ID:</label>
                    <input type="email" value={mailId} disabled/>
                </div>
                <div>
                    <label>Project Description:</label>
                    <textarea value={Description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={(e) => {
                        setImage(e.target.files[0])
                        const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                                setshowimage(reader.result);
                            };
                        }} accept="image/*" />
                    <button onClick={StoreImage} >Upload</button>
                </div>
                <img src={showimage} alt="" width="300" height="200"/>
                <button type="submit">Submit</button>
                {error && <p>Error Ocurred while uploading Image</p>}
                {err && <p>Error Ocurred </p>}
            </form>
        </div>
        </div>
    );
}

export default AddProject;
