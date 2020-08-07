const proffys = [
    {
        name: "Diego Fernandes",
        avatar:"http://pngimg.com/uploads/robot/robot_PNG100.png",
        whatsapp:"11998557744",
        bio:"Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject:"Química",
        cost: "50",
        week_day: [1], 
        time_from:[540], 
        time_to:[720]
    }
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",  
]
const weekdays =[
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
});

function getSubject(subjectNumber){
    const arrayPosition = subjectNumber -1;
    return subjects[arrayPosition];
}

function pageLanding(request, response) {
    return response.render("index.html")
} 
function pageStudy(request, response) {
    const filters = request.query;
    return response.render("study.html", {proffys, filters, subjects, weekdays})
} 
function pageGiveClasses(request, response) {
    const data = request.query;
    const isNotEmpty = Object.keys(data).length > 0;
    if(isNotEmpty){
        data.subject = getSubject(data.subject);
        proffys.push(data);
        return response.redirect("/study");
    }
    return response.render("give-classes.html", {subjects, weekdays})
}

server.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)