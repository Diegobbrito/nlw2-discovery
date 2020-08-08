const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async (db) => {

    proffyValue = {
        name: "Diego Fernandes",
        avatar:"http://pngimg.com/uploads/robot/robot_PNG100.png",
        whatsapp:"11998557744",
        bio:"Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."

    }

    classValue = {
        subject:"Química",
        cost: "50"
    }

    classScheduleValues = [
        {
            week_day: 1, 
            time_from: 540, 
            time_to: 720
        },
        {
            week_day: 2, 
            time_from: 540, 
            time_to: 720
        }
    ]
    //Criar classe
    // await createProffy(db, {proffyValue, classValue, classScheduleValues})
    
    //Consultar dador
    const selectedProffys = await db.all("SELECT * FROM proffys")
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "720"
    `)

})