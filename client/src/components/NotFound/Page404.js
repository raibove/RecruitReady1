import React from 'react'
import '../NotFound/Page404.css';

function Page404(props){
    return(
        <div className="" style={{minHeight:"72vh",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
            <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_afwjhfb2.json"  background="transparent"  speed="1"  style={{maxWidth: "100%", height: "430px"}}  loop  autoplay></lottie-player>
            <h1 class="ml3 font-weight-bolder">Lost the track ?</h1>
            <p className="ml-1 animate">Checkout our menu section</p>        
            </div>
    );
}


export default Page404;