import React, { useEffect } from 'react';

import useFetchGetparams from '../../hooks/useFetchGetparams';
import UseGetToken from '../../hooks/useGetToken';

import Navbar from './navbar';
import "../../stylesheets/entrepreneur/Studentresponses.css"

const InvestmentAppeals = () => {

    const [getrequestwithparams, data, isPending, error] = useFetchGetparams();
    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequestwithparams(`http://localhost:8081/EntrtoInv/all/${tokendata}`);
        }
    } , [tokendata])


    return (
        <div>
            <Navbar/>
            <div className="ideas-container">
            { data && data.map(appeal => (
                <div className="idea-item" key={appeal._id}>
                    <h3><strong>Project Name : </strong>{appeal.projectName}</h3>
                    <img src={`http://localhost:8081${appeal.ImageUrl}`} alt="Project Image" />
                    <div className="idea-details">
                    <p><strong>Description :</strong> {appeal.projectDescription}</p>
                    <p><strong>Idea :</strong> {appeal.projectIdea}</p>
                    <p><strong>Student Name : </strong>{appeal.studentname}</p>
                    <p><strong>Student mailId : </strong>{appeal.studentmail}</p>
                    <p><strong>Investor mailId : </strong>{appeal.investormail}</p>
                    <p><strong>Estimated cost : </strong>{appeal.estimatedcost}</p>
                    </div>
                </div>
             ))}
            {isPending && <p>No Ideas Found</p>}
            {error && <p>Could Not fetch the data from the server</p>}
            </div>
        </div>
    );
}

export default InvestmentAppeals;
