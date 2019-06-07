// JavaScript Document
//Inicia express que nos ayuda a crear un servidor local
const express = require('express');
const app = express();
//--------------------------------------------

//Body Parser para datos enviados por POST
const bodyParser = require('body-parser');
//----------------------------

//Handle Bars
const hbs = require('hbs');
//----------------

//Trae la ruta en la que esta el proyecto situado
const path = require('path');
const public_dir= path.join(__dirname,'../public');
const partials_dir= path.join(__dirname,'../partials');
//-------------------------------------------

//Funciones
let course = require("./courses_script");
let enrolled = require("./enrolled_script");
require("./helpers");
//

app.use(express.static(public_dir));
hbs.registerPartials(partials_dir);
app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine", 'hbs');

app.get('/',(req,res)=>{
	res.render('courses');
});

app.get('/courses',(req,res)=>{
	res.render('courses',{
		duplicated: req.query.duplicated ? req.query.duplicated : false,
		created: req.query.created ? req.query.created : false,
	});
});

app.get('/course/new',(req,res)=>{
	res.render('course_form');
});

app.post('/course/new',(req,res)=>{
	let c = {
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		value: req.body.value,
		mode: req.body.mode,
		intensity: req.body.intensity,
		availability: 'Disponible'
	};

	let result = course.createCourse(c);
	if(result){
		res.redirect('../courses?created=true');
	}else{
		res.redirect('../courses?duplicated=true');
	}
});

app.get('/enroll/new',(req,res)=>{
	res.render('enroll_form');
});

app.post('/enroll/new',(req,res)=>{
	let e = {
		course: req.body.course,
		doc: req.body.doc,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone
	};

	let result = enrolled.createEnrolled(e);
	if(result){
		res.redirect('../enrolled?created=true');
	}else{
		res.redirect('../enrolled?duplicated=true');
	}
});

app.get('/enrolled',(req,res)=>{
	res.render('enrolled',{
		duplicated: req.query.duplicated ? req.query.duplicated : false,
		created: req.query.created ? req.query.created : false,
	});
});

app.get('/course/close',(req,res)=>{
	course.deleteCourse(req.query.course);
	res.redirect('../enrolled');
});

app.get('/enrolled/delete',(req,res)=>{
	enrolled.deleteEnrolled(req.query.course,req.query.student);
	res.redirect('../enrolled');
});

app.listen(3000,()=>{
	console.log("Servidor Local iniciado en el puerto 3000");
});