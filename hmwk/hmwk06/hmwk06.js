
let findCoursesDept = "";

async function fetchInstructorList(){
    let response = await fetch('csmp.json');
    let data = await response.json();
    
    let instructors = [];
    let instructorsHTML = "";
    data.forEach((object) => {
        let duplicate = false;
        instructors.sort();
        instructors.forEach((Inst) => {
            if(object.instructor == Inst){
                duplicate = true;
            }
        })
        if(duplicate == false){
            instructors.push(object.instructor);
        }
    })
    instructors.forEach((instructor) => {
        instructorsHTML += ("<option value='" + instructor + "'>"+ instructor + "</option>");
    })
    document.getElementById("Instructor").innerHTML = instructorsHTML;
}

async function findCourses(){
    //console.log(document.getElementById("Instructor").value);
    console.log(document.getElementById("dept").value)
    let response = await fetch('https://raw.githubusercontent.com/noynaert/act311midterm/main/' + findCoursesDept);
    let data = await response.json();

    let courses = "";
    let tableInnerHtml = ""
    
    data.forEach((object) => {
        if(object.instructor == document.getElementById("Instructor").value){
            courses += ("<li>"+object.course+"-"+object.sec+"</li>");
            tableInnerHtml += "<tr style='background-color: #FFFF00'><td>course</td><td>"+object.course+"-"+object.sec+"</td></tr><tr><td>crn num</td><td>"+object.crn+"</td></tr><tr><td>days</td><td>"+object.days+"</td></tr><tr><td>times</td><td>"+object.times+"</td></tr><tr><td>room</td><td>"+object.room+"</td></tr><tr><td>hours</td><td>"+object.hours+"</td></tr><tr><td>term</td><td>"+object.course_term+"</td></tr><tr><td>Seats left</td><td>"+object.course_enrollment[ 'Section Seats Available' ]+"</td></tr>"
        }
    })
    //console.log(courses);
    document.getElementById("courseTable").innerHTML = tableInnerHtml;

}

async function fetchFiles(){
    document.getElementById("invi").style.visibility = "hidden";
    let response = await fetch('https://raw.githubusercontent.com/noynaert/act311midterm/main/all.json');
    let data = await response.json();
    let departments = "";

    data.forEach((dept) => {
        //console.log(dept.dept);
        departments += "<option value='"+dept.dept+"'>"+dept.dept +"</option>";
        //document.getElementById("dept").innerHTML = departments;
    })
    document.getElementById("dept").innerHTML = departments;
}

async function allInstructors(){
    document.getElementById("invi").style.visibility = "visible";
    let response = await fetch('https://raw.githubusercontent.com/noynaert/act311midterm/main/all.json');
    let data = await response.json();
    let deptartment = "";
    let Instructors = [];
    let InstructorsInnerHTML = "";

    data.forEach((dept) => {
        //console.log(document.getElementById("dept").value);
        //console.log(dept.dept);
        if(document.getElementById("dept").value == dept.dept){
            deptartment = dept.filename;
        }
    })
    findCoursesDept = deptartment;

    response = await fetch(('https://raw.githubusercontent.com/noynaert/act311midterm/main/' + deptartment));
    data = await response.json();
    data.forEach((course)=> {
        let duplicate = true;
        Instructors.forEach((instructor)=>{
            //console.log(instructor);
            //console.log(course.instructor);
            if(instructor == course.instructor){
                duplicate = false;
            }
        console.log(duplicate);
        })
        if(duplicate == true){
            Instructors.push(course.instructor);
        }
    })
    Instructors.sort()
    Instructors.forEach((instructor) => {
        InstructorsInnerHTML += "<option value='" + instructor + "'>"+ instructor + "</option>";
    })
    console.log(InstructorsInnerHTML);
    document.getElementById("Instructor").innerHTML = InstructorsInnerHTML;
}


async function getJson(fileName){
    let response = await fetch(fileName)
    let data = await response.json();
    return data;
}