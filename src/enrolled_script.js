const fs = require("fs");
list_enrolled=[];

const createEnrolled = (enrolled) =>{
	loadEnrolled();

	exist_enrolled = list_enrolled.find(c => (c.course == enrolled.course && c.doc == enrolled.doc));
	if(!exist_enrolled){
		list_enrolled.push(enrolled);
		saveEnrolled();
		return true;
	}else{
		return false;
	}
}

const deleteEnrolled = (course_id,student_id) =>{
	loadEnrolled();

	index = list_enrolled.findIndex(e => (e.course == course_id & e.doc == student_id));
	if(index != -1){
		list_enrolled.splice(index,1);
		saveEnrolled();
	}
}

const loadEnrolled = ()=>{
	try{
		list_enrolled = require("./enrolled.json");
	}catch(error){
		list_enrolled = [];
	}
}

const saveEnrolled = () =>{
	let data = JSON.stringify(list_enrolled);
	fs.writeFile("./src/enrolled.json",data, (err)=>{
		if(err){
			throw err;
		}
		console.log("Inscripcion Correcta");
	});
}

module.exports = {
	createEnrolled,
	deleteEnrolled
};