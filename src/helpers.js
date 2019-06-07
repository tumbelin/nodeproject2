const hbs=require("hbs");

hbs.registerHelper("showCourses", ()=>{
	try{
		list_courses = require("./courses.json");
	}catch(error){
		list_courses = [];
	}

	list_courses=list_courses.filter(course => course.availability == "Disponible");

	var result = "<div>";

	list_courses.forEach(course => {
		result = result + "<div class='card'><div class='containercard' data-toggle='collapse' data-target='#course" + course.id  + "'><h4><b>Nombre: " + course.name + "</b></h4><p>Descripción: "+  course.description + "</p><p>Valor: " + course.value + "</p></div>";
		result = result + "<div id='course" + course.id  + "' class='containercard collapse'><p>Modalidad: " +  (course.mode ? course.mode : "Por Definir") + "</p><p>Intensidad Horaria: " + (course.intensity ? course.intensity : "Por Definir") + "</p></div></div>";
	});

	result = result + "</div>";

	return result;
});


hbs.registerHelper("coursesOptions", ()=>{
	try{
		list_courses = require("./courses.json");
	}catch(error){
		list_courses = [];
	}

	list_courses=list_courses.filter(course => course.availability == "Disponible");

	var result = "";

	list_courses.forEach(course => {
		result = result + "<option value='" + course.id + "'>" + course.name +"</option>";
	});

	return result;
});

hbs.registerHelper("showEnrolled", ()=>{
	try{
		list_courses = require("./courses.json");
	}catch(error){
		list_courses = [];
	}

	try{
		list_enrolled = require("./enrolled.json");
	}catch(error){
		list_enrolled = [];
	}

	list_courses=list_courses.filter(course => course.availability == "Disponible");

	result = "";
	list_courses.forEach(course => {
		result = result + "<h1>"  + course.name + " <a class ='btn btn-danger' href='./course/close?course=" + course.id + "'>Cerrar Curso</a></h1>";
		people = list_enrolled.filter(c => c.course == course.id );
		result = result + "<table class='table table-striped table-bordered table-hover'><thead><th>Id</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Opciones</th>";
		people.forEach(student =>{
			result = result + "<tr><td>" + student.doc +"</td><td>" + student.name +"</td><td>" + student.email + "</td><td>" + student.phone + "</td><td><a class='btn btn-danger' href='../enrolled/delete?student=" + student.doc + "&course=" + course.id + "'>Remover Estudiante</a></td></tr>";
		});
		result = result + "</table><br />";
	});

	return result;
});