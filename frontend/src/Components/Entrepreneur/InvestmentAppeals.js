import React, { useEffect , useState } from 'react';

import useFetchGetparams from '../../hooks/useFetchGetparams';
import UseGetToken from '../../hooks/useGetToken';

import Navbar from './navbar';
import "../../stylesheets/entrepreneur/Studentresponses.css"

const InvestmentAppeals = () => {

    const [getrequestwithparams, data, isPending, error] = useFetchGetparams();
    const [getToken,tokendata] = UseGetToken();
    const [selectedProject, setselectedProject] = useState(null);

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequestwithparams(`http://localhost:8081/EntrtoInv/all/${tokendata}`);
        }
    } , [tokendata])


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
                        <button onClick={() => openModal(appeal)} data-bs-toggle="modal" data-bs-target={`#exampleModal-${appeal._id}`} id='viewer'>View Your Appeal</button>
                    </div>
                        {/* modal */}
                        <div className="modal fade" id={`exampleModal-${appeal._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel-${appeal._id}`} aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{appeal.projectName}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="modal-image">
                                                <img src={`http://localhost:8081${appeal.ImageUrl}`} alt="Project Image" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="modal-info">
                                                <p><strong>Description :</strong> {appeal.projectDescription}</p>
                                                <p><strong>Idea :</strong> {appeal.projectIdea}</p>
                                                <p><strong>Estimated cost : </strong>{appeal.estimatedcost}</p>
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
            {isPending && <p>No Ideas Found</p>}
            {error && <p>Could Not fetch the data from the server</p>}
            </div>
        </div>
    );
}

export default InvestmentAppeals;
