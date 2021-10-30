import React from "react";
import { useEffect, useState } from "react";
import Main from "../audio/Main";
import { db } from "../../firebase/config";



function DashBoard() {



    return (
        <div className="container">
            <Main/>
        </div>
    );
}
export default DashBoard;