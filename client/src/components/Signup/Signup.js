import React from 'react'
import { useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link } from 'react-router-dom';

function Signup(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword( email, password).then((res)=>{
            console.log("res", res);
            props.history.push("/dashboard");
        }).catch((error)=>{
            console.log("error", error);
        });
    }

    return (
        <section class="vh-100" style={{backgroundColor: "#9A616D"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style={{borderRadius: "1rem"}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img1.jpg"
                alt="login form"
                class="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}}
              />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form onSubmit={handleSubmit}>

                  

                  <h5 class="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Create Account</h5>

                  <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example17">Email address</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" id="form2Example17" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example27">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" id="form2Example27" class="form-control form-control-lg" />
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="submit">Sign-Up</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style={{color: "#393f81"}}>Already had an account? <Link to="/login" style={{color: "#393f81"}}>Login here</Link></p>
                  <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>    )
}

export default Signup
