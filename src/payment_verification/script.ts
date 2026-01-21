setInterval(async () => {
    let data = await fetch("https://api.goodschool.online/get_student_for_s", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_student") + ""),
            name: localStorage.getItem("name"),
            surname: localStorage.getItem("surname"),
        })
    }) as any
    data = await data.json()
    console.log(data.paid_lessons)
    if(+((localStorage.getItem('classes_status_user')+ "").split(" ")[1]) != data.paid_lessons){
        localStorage.setItem("classes_status_user", (localStorage.getItem('classes_status_user')+ "").split(" ")[0] + " " + data.paid_lessons)
        window.location.href = "./personal-area-student.html"
    }
}, 500)