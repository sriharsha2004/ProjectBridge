import React, { useEffect } from 'react';
import Navbar from './navbar';

import useFetchGetparams from '../../hooks/useFetchGetparams';
import UseGetToken from '../../hooks/useGetToken';
import "../../stylesheets/student/Tieups.css"

const ETieups = () => {

    const [getrequest , data , isPending , error ] = useFetchGetparams();

    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequest(`http://localhost:8081/Investments/Entrepreneur/all/${tokendata}`);
        }
    } , [tokendata])
    

    return (
        <div>
            <Navbar />
            <h2>Your Contributions</h2>
            { data && data.filter(tie => tie.status === "complete").length > 0 ? (
                data.filter(tie => tie.status === "complete").map( tie=>(
                    <div key={tie._id} className="tie-item">
                        <div className="tie-image">
                            <img src={`http://localhost:8081${tie.ImageUrl}`} alt="Project Image" />
                        </div>
                        <div className="tie-details">
                            <h3><strong>Project Name : </strong>{tie.projectName}</h3>
                            <p><strong>Description :</strong> {tie.projectDescription}</p>
                            <p><strong>Idea :</strong> {tie.projectIdea}</p>
                            <p><strong>Estimated cost : {tie.estimatedcost}</strong></p>
                            <p><strong>Student Name : </strong>{tie.studentname}</p>
                            <p><strong>Student mailId : </strong>{tie.studentmail}</p>
                            <p><strong>Entrepreneur Name : </strong>{tie.entrname}</p>
                            <p><strong>Entrepreneur mailId : </strong>{tie.Entrmail}</p>
                            <p><strong>Investor mailId : </strong>{tie.investormail}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className='pending-message'>No TieUps Found</p>
            )}
            { error && <p className='error-message'>Could not fetch the data from the server</p>}
        </div>
    );
}

export default ETieups;
