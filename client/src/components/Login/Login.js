import React from 'react'
import './login.css';
import {useState} from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link } from 'react-router-dom';

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    const handleSubmit = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((res)=>{
            console.log(res);
            props.history.push("/dashboard");
        }).catch((error)=>{
            console.log("error", error);
        });
        setPassword("");
        setEmail("");
        
    }

    return (
        <section style={{minHeight:"70vh"}}>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 text-black">

        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form onSubmit={handleSubmit} style={{width: "23rem"}}>

            <h3 class="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Log in</h3>

            <div class="form-outline mb-4">
            <label class="form-label" for="form2Example18">Email address</label>
              <input onChange={(e)=>setEmail(e.target.value)} type="email" id="form2Example18" class="form-control form-control-lg" />
            </div>

            <div class="form-outline mb-4">
            <label class="form-label" for="form2Example28">Password</label>
              <input onChange={(e)=>setPassword(e.target.value)} type="password" id="form2Example28" class="form-control form-control-lg" />
            </div>

            <div class="pt-1 mb-4">
              <button class="btn btn-info btn-lg btn-block" type="submit">Login</button>
            </div>

            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
            <p>Don't have an account? <Link to="/signup" class="link-info">Register here</Link></p>

          </form>

        </div>

      </div>
      <div class="col-sm-6 px-0 d-none d-sm-block">
        <img src="https://images.unsplash.com/photo-1572028629184-6ecbfc2fcb86?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80" alt="Login" class="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}}/>
      </div>
    </div>
  </div>
</section>               
                
                )
}

                export default Login;
