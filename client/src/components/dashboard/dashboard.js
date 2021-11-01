import React from "react";
// import Main from "../audio/Main";
import './dashboard.css'
import {Link} from "react-router-dom"




function DashBoard() {


    

    

    // return (
    //     <div className="container">
    //         <Main/>
            
    return (
        <div className="container">
            <h1 className="text-center mt-5" style={{fontWeight:"700"}}>Interview Preparation</h1>
            {/* <Main/> */}
            <div id="cards_landscape_wrap-2">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 ">
                   
                    <Link to="/technical">
                        <div className="card-flyer">
                            <div className="text-box">
                                <div className="image-box">
                                    <img src="https://cdn.pixabay.com/photo/2016/10/13/16/26/web-agency-1738168_960_720.jpg" alt="" />
                                </div>
                                <div className="text-container">
                                    <h6>Technical Round</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <Link to="/manage">
                        <div className="card-flyer">
                            <div className="text-box">
                                <div className="image-box">
                                    <img src="https://cdn.pixabay.com/photo/2016/03/09/09/22/meeting-1245776_960_720.jpg" alt="" />
                                </div>
                                <div className="text-container">                                    
                                    <h6>Managerial Round</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <Link to="/hr">
                        <div className="card-flyer">
                            <div className="text-box">
                                <div className="image-box">
                                    <img src="https://cdn.pixabay.com/photo/2020/12/09/10/34/meeting-5817031_960_720.jpg" alt="" />
                                </div>

                                <div className="text-container">
                                    <h6>HR Round</h6>
                                   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                </div>
            </div>
        </div>
    </div>
        </div>
    );
}

export default DashBoard;