import React from "react";
import { useEffect, useState } from "react";
import Main from "../audio/Main";
import { firestore } from "../../firebase/config";



function DashBoard() {


    const [questions, setQuestions] = useState([]);

    useEffect(async()=>{
            await firestore.collection("sections").doc("Technical").collection("questions").get().then((snapShot)=>{
                var data = [];
                    snapShot.forEach((doc)=>{
                        data.push(doc.data()['text']);
                    });
                    setQuestions(data);
            }).catch((error)=>{
                console.log(error);
            })
    },[])

    return (
        <div className="container">
            <Main/>
            
        </div>
    );
}
export default DashBoard;