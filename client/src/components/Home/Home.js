import React from 'react'
import {Link} from 'react-router-dom'
function Home() {

    return (
        <div>
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col mt-5">
                        <button type="button" style={{marginLeft:"80%"}}  className="btn btn-light"><Link style={{textDecoration:"none",color:"black"}} to="/login">Login</Link></button>
                        <button type="button" style={{marginLeft:"10px"}}className="btn btn-info"><Link style={{textDecoration:"none",color:"white"}} to="/signup">Signup</Link></button>
                    </div>
                </div>
            </div>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col">
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_ivtaxtzm.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></lottie-player>

                    </div>
                    <div className="col">
                        <h1 style={{ fontWeight: "700" }}>Hire Better People with Professional Audio Interviewing</h1>
                        <h4 style={{ marginTop: "50px" }}>RecruitReady helps HR professionals worldwide save time, money and headspace by modernizing outdated recruitment processes.</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
