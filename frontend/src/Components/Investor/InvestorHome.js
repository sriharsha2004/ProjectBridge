import React, { useEffect , useState} from 'react';
import Navbar from './navbar';

import useFetchGetparams from '../../hooks/useFetchGetparams';
import useUpdate from '../../hooks/useUpdate';
import UseGetToken from '../../hooks/useGetToken';

import "../../stylesheets/investor/appeals.css"
import useDelete from '../../hooks/useDelete';

const InvestorHome = () => {

    const [getrequest , data , isPending , error] = useFetchGetparams();
    const [updaterequest,upddata,updispending,upderr] = useUpdate();
    const [deleterequest,deldata,delispending,delerr] = useDelete();

    const [selectedProject, setselectedProject] = useState(null);

    const [getToken,tokendata] = UseGetToken();

    useEffect(()=>{
        getToken("http://localhost:8081/verifytoken");
        console.log(tokendata);
        if(tokendata!=undefined){
            getrequest(`http://localhost:8081/Investments/all/${tokendata}`);
        }
    } , [tokendata])

    var handleInvestment = (invest) =>{
        var conf = window.confirm("Do you want to proceed ??");
        if(conf){
            alert("Message will be notified to student and entrepreneur");
            updaterequest(`http://localhost:8081/Investments/update/${invest._id}`);
            deleterequest(`http://localhost:8081/Ideas/delete/${invest.IdeaId}`)
            deleterequest(`http://localhost:8081/Projects/delete/${invest.projectId}`)
        }
    }

    const openModal = (invest) => {
        setselectedProject(invest);
    };

    const closeModal = () => {
        setselectedProject(null);
    };
    

    return (
        <div>
            <Navbar/>
            <div className="inv-home-container">
            <h2>Your Opportunities</h2>
             {!isPending && !error && (
                <div className="appeals-container">
                {data && data.filter(invest => invest.status === "pending").length > 0 ? (
                    data.filter(invest => invest.status === "pending").map(invest => (
                        <div key={invest._id} className="appeal-item">
                            <div className="appeal-image">
                                <img src={`http://localhost:8081${invest.ImageUrl}`} alt="Project Image" />
                            </div>
                            <div className="appeal-details">
                                <h3><strong>Project Name : </strong>{invest.projectName}</h3>
                                <p><strong>Description :</strong> {invest.projectDescription}</p>
                                <p><strong>Idea :</strong> {invest.projectIdea}</p>
                                <p><strong>Estimated cost : </strong>{invest.estimatedcost}</p>
                                <p><strong>Student Name : </strong>{invest.studentname}</p>
                                <p><strong>Student mailId : </strong>{invest.studentmail}</p>
                                <p><strong>Entrepreneur Name : </strong>{invest.entrname}</p>
                                <p><strong>Entrepreneur mailId : </strong>{invest.Entrmail}</p>
                                <button onClick={() => handleInvestment(invest)}>Invest Now</button>
                                <button onClick={() => openModal(invest)} data-bs-toggle="modal" data-bs-target={`#exampleModal-${invest._id}`} id='viewer'>View Details</button>
                            </div>

                            {/* modal */}
                            <div className="modal fade" id={`exampleModal-${invest._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel-${invest._id}`} aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{invest.projectName}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="modal-image">
                                                <img src={`http://localhost:8081${invest.ImageUrl}`} alt="Project Image" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="modal-info">
                                                <p><strong>Description:</strong> {invest.projectDescription}</p>
                                                <p><strong>Idea :</strong> {invest.projectIdea}</p>
                                                <p><strong>Enstimated Cost :</strong>{invest.estimatedcost}</p>
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
                    ))
                ) : (
                    <p className="pending-message">No Funding Prospects</p>
                )}
                </div>
                )}
                {isPending && <p className="pending-message">No Funding Prospects</p>}
                {error && <p className="error-message">Could Not fetch the data from the server</p>}
            </div>
        </div>
    );
}

export default InvestorHome;
