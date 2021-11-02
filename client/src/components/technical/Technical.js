import React from 'react'
import './technical.css';
// import Main from '../audio/Main'
import {useEffect, useState} from 'react';
import {firestore} from '../../firebase/config';

function Technical() {

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
        questions.length==0?<div class="spinner-border text-primary " style={{top:"50%", left:"50%",position:"absolute"}}></div>:<div className="container">
		<h1 className="text-center">Technical</h1>
		{/* <Main/> */}
		<section class="light">
<div class="container py-2">
	<div class="h1 text-center text-dark" id="pageHeaderTitle">My Cards Light</div>
	{ questions.map((data)=>{
		return (
			<article class="postcard light blue">
		<a class="postcard__img_link" href="#">
			<img class="postcard__img" src="https://picsum.photos/1000/1000" alt="Image Title" />
		</a>
		<div class="postcard__text t-dark">
			<h1 class="postcard__title blue"><a href="#">{data}</a></h1>
			<div class="postcard__subtitle small">
				<time datetime="2020-05-25 12:00:00">
					<i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
				</time>
			</div>
			<div class="postcard__bar"></div>
			<div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
			<ul class="postcard__tagbox">
				<li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
				<li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li>
				<li class="tag__item play blue">
					<a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
				</li>
			</ul>
		</div>
	</article>
		);
	})}
	
	
	
	
</div>
</section>
	</div>
    )
}

export default Technical
