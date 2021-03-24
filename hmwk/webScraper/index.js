console.log("Starting")
const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
const url = "https://aps4.missouriwestern.edu/schedule/?tck=202210";

let subject = [];
let departments = [];

axios.get(url)
.then(resp =>{
    const html = resp.data
    const $ = cheerio.load(html)
    getSubjects($)
})
.catch(err => console.log("Error Fetching:" , err))


function getSubjects($){
    console.log("In getSubjects()")
    const select = $('#subject')
    select.children().each((i,e) =>{
        console.log(i, '--',$(e).attr('value')+'..'+$(e).text())
        let value = $(e).attr('value');
        let text = $(e).text();
        console.log(value,text);
        let department = {};
        department.value = value;
        department.text = text;
        console.log(department);
        subject.push(department);
    })
    fs.writeFile('subject.json',JSON.stringify(subject),err=>{
        if(err){
            console.log("Error Writing File:", err)
        }else{
            console.log("department.json file created")
        }
    })
}


axios.get(url)
.then(resp =>{
    const html = resp.data
    const $ = cheerio.load(html)
    getDepartments($)
})
.catch(err => console.log("Error Fetching:" , err))

function getDepartments($){
    console.log("In getDepartments()")
    const select = $('#department')
    select.children().each((i,e) =>{
        console.log(i, '--',$(e).attr('value')+'..'+$(e).text())
        let value = $(e).attr('value');
        let text = $(e).text();
        console.log(value,text);
        let department = {};
        department.value = value;
        department.text = text;
        console.log(department);
        departments.push(department);
    })
    fs.writeFile('deptartment.json',JSON.stringify(departments),err=>{
        if(err){
            console.log("Error Writing File:", err)
        }else{
            console.log("department.json file created")
        }
    })
}