import React, { useEffect, useState } from 'react';
import Navbar from './navbar';

import useFetchGetparams from "../../hooks/useFetchGetparams"
import UseGetToken from '../../hooks/useGetToken';
import "../../stylesheets/investor/investments.css"


const Investments = () => {

    const [getrequest , data , isPending , error ] = useFetchGetparams();

    const [cost,setcost] = useState(0);

    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequest(`http://localhost:8081/Investments/all/${tokendata}`);
        }
    } , [tokendata])

    useEffect(() => {
        if (data) {
            const totalCost = data.filter(invest => invest.status === "complete")
                                  .reduce((sum, invest) => sum + parseInt(invest.estimatedcost), 0);
            setcost(totalCost);
        }
    }, [data]);

    return (
        <div>
            <Navbar/>
            <h2>Your total Investment : {cost}</h2>
            {!isPending && !error && (
                <div className="investments-container">
                {data && data.filter(invest => invest.status === "complete").length > 0 ? (
                    data.filter(invest => invest.status === "complete").map(invest => (
                        <div key={invest._id} className="investment-item">
                            <div className="investment-image">
                                <img src={`http://localhost:8081${invest.ImageUrl}`} alt="Project Image" />
                            </div>
                            <div className="investment-details">
                                <h3><strong>Project Name : </strong>{invest.projectName}</h3>
                                <p><strong>Description :</strong> {invest.projectDescription}</p>
                                <p><strong>Idea :</strong> {invest.projectIdea}</p>
                                <p><strong>Estimated cost : {invest.estimatedcost}</strong></p>
                                <p><strong>Student Name : </strong>{invest.studentname}</p>
                                <p><strong>Student mailId : </strong>{invest.studentmail}</p>
                                <p><strong>Entrepreneur Name : </strong>{invest.entrname}</p>
                                <p><strong>Entrepreneur mailId : </strong>{invest.Entrmail}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="pending-message">No Investments Found</p>
                )}
                </div>
                )}
                {isPending && <p className="pending-message">No Investments Found</p>}
                {error && <p className="error-message">Could Not fetch the data from the server</p>}
            </div>
    );
}

export default Investments;
