// import "../interface_good_school.scss"
import "./style.scss"

let userNameSurname_div = document.querySelector(".blockTop_name .user_name_surname") as HTMLDivElement
const timetableClasses_thisWeek = document.querySelector("#timetable_classes_this_week") as HTMLDivElement
let str_timetableClasses_thisWeek = ""
// let data_now = new Date().getDay()
let timetable_classes_arr: any
const but_setup_1_platform_setup = document.querySelector("#but_setup_1") as HTMLButtonElement
const but_setup_2_platform_setup = document.querySelector("#but_setup_2") as HTMLButtonElement
const link_platform_setup = document.querySelector("#super_a") as HTMLLinkElement
const button_1_copy_phone = document.querySelector("#button_1_copy_phone") as HTMLLinkElement
let text_copy_phone = ""
const information_about_teacherLink_1 = document.querySelector(".information_about_teacher #link_1") as HTMLLinkElement
const information_about_teacherLink_2 = document.querySelector(".information_about_teacher #link_2") as HTMLLinkElement
const information_about_teacherTeacher_p = document.querySelector(".information_about_teacher #teacher_p") as HTMLDivElement
const link_to_lesson = document.querySelector("#link_to_lesson") as HTMLButtonElement
const notification_button = document.querySelector(".notification_block button") as HTMLButtonElement
// @ts-ignore
let detect = new MobileDetect(window.navigator.userAgent)

// userNameSurname_div.innerText = localStorage.getItem("name") + " " + localStorage.getItem("surname")
let string_name = (localStorage.getItem("name") + "").split("")
string_name[0] = string_name[0].toUpperCase()
let string_surname = (localStorage.getItem("surname") + "").split("")
string_surname[0] = string_surname[0].toUpperCase()
userNameSurname_div.innerText = string_surname.join("") + " " + string_name.join("")


async function start_page() {
    let data = await fetch("https://api.goodschool.online/get_student_start_page", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_student") + "")
        })
    }) as any
    data = await data.json()
    console.log(data);
    if (data.name != localStorage.getItem("name") || data.surname != localStorage.getItem("surname")) {
        localStorage.setItem("name", "")
        localStorage.setItem("surname", "")
        localStorage.setItem("id_student", "")
        window.location.href = "./"
    }
}
start_page()

async function render_timetable_start() {
    try {

        let data = await fetch("https://api.goodschool.online/get_teacher_for_s", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: +(localStorage.getItem("id_student") + ""),
                name:localStorage.getItem("name"),
                surname:localStorage.getItem("surname"),
            })
        }) as any
        data
        data = await data.json()
        information_about_teacherLink_1.href = "https://wa.me/" + data.phone
        information_about_teacherLink_2.href = "https://t.me/" + data.phone

        let string_data_surname = data.surname.split("")
        string_data_surname[0] = string_data_surname[0].toUpperCase()
        let string_data_name = data.name.split("")
        string_data_name[0] = string_data_name[0].toUpperCase()
        let string_data_patronymic = data.patronymic.split("")
        string_data_patronymic[0] = string_data_patronymic[0].toUpperCase()

        information_about_teacherTeacher_p.innerHTML = "<div>" + string_data_surname.join("") + "</div>" + string_data_name.join("") + " " + string_data_patronymic.join("")
        text_copy_phone = data.phone
        console.log("data");
        console.log(data);
        timetable_classes_arr = JSON.parse(data.timetable_classes)
        str_timetableClasses_thisWeek = ""
        timetableClasses_thisWeek.innerHTML = ''
        if (detect.mobile() != null) {
            button_1_copy_phone.href = "tel:" + text_copy_phone
        }
        let num_lessons_this_week = 0
        for (let time = 8; time != 22; time++) {
            let derivation_on = false
            str_timetableClasses_thisWeek += `<span class="text_grid_time">
        ${time}.00
        </span>`
            for (let day = 1; day != 8; day++) {
                let time_block = ""
                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work" && timetable_classes_arr[i].id == localStorage.getItem("id_student")){
                        time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                        num_lessons_this_week++
                    } 
                }
                if (time_block != "") {
                    str_timetableClasses_thisWeek += time_block
                    derivation_on = true
                }
                else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`

            }
            if (derivation_on) timetableClasses_thisWeek.innerHTML += str_timetableClasses_thisWeek
            str_timetableClasses_thisWeek = ""
        }
        console.log(num_lessons_this_week);
        if(num_lessons_this_week == 0){
            timetableClasses_thisWeek.style.display = "none"
            const timetable_classes_up_day = document.querySelector(".timetable_classes_up_day") as HTMLDivElement
            timetable_classes_up_day.innerText = "На этой недели у вас нет занятий"
            timetable_classes_up_day.classList.add("none_lessons_this_week")
            const timetable_classes_up_day_vecino_div = document.querySelector(".timetable_classes_scroll + div") as HTMLDivElement
            timetable_classes_up_day_vecino_div.style.marginTop = "20px"
        }
        
    }
    catch(e) {
        // console.log(e);
        localStorage.setItem("name", "")
        localStorage.setItem("surname", "")
        localStorage.setItem("id_student", "")
        window.location.href = "./"
    }
}
render_timetable_start()
async function paid_lessons() {
    let get_student = await fetch("https://api.goodschool.online/get_student_for_s", {
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
    get_student = await get_student.json()
    console.log(get_student);
    const paid_lessons_span = document.querySelector(".paid_lessons") as HTMLElement
    paid_lessons_span.innerText = "Оплаченные занятия: " + get_student.paid_lessons
}
paid_lessons()

async function render_platform_setup() {
    let get_student = await fetch("https://api.goodschool.online/get_student_for_s", {
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
    get_student = await get_student.json()
    let get_student_platform_lesson = ""
    //FIXME - исправить это безобразие
    get_student_platform_lesson = get_student.platform_lesson
    if (get_student_platform_lesson == "Discord") {
        but_setup_1_platform_setup.classList.add("button_platform_setup_on")
        link_platform_setup.href = "https://volpi.ru/files/manuals/discord.pdf"
        link_to_lesson.innerHTML = "скопировать <span> ник учителя </span>"
    }
    else {
        but_setup_2_platform_setup.classList.add("button_platform_setup_on")
        link_platform_setup.href = "https://support.zoom.com/hc/ru/article?id=zm_kb&sysparm_article=KB0061326"
        link_to_lesson.innerText = "скопировать ссылку на урок"
    }
}
render_platform_setup()
but_setup_1_platform_setup.addEventListener("click", async () => {
    if (but_setup_1_platform_setup.className == "igs_button_universal_B1 transparent_button") {

        but_setup_1_platform_setup.classList.add("button_platform_setup_on")
        but_setup_2_platform_setup.classList.remove("button_platform_setup_on")
        link_platform_setup.href = "https://volpi.ru/files/manuals/discord.pdf"
        link_to_lesson.innerText = "скопировать ник учителя"

        await fetch("https://api.goodschool.online/change_student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                where: {
                    id: +(localStorage.getItem("id_student") + ""),
                    name: localStorage.getItem("name"),
                    surname: localStorage.getItem("surname"),
                },
                data: "Discord"
            })
        })
    }

})
but_setup_2_platform_setup.addEventListener("click", async () => {
    if (but_setup_2_platform_setup.className == "igs_button_universal_B1 transparent_button") {
        
        but_setup_2_platform_setup.classList.add("button_platform_setup_on")
        but_setup_1_platform_setup.classList.remove("button_platform_setup_on")
        link_platform_setup.href = "https://support.zoom.com/hc/ru/article?id=zm_kb&sysparm_article=KB0061326"
        link_to_lesson.innerText = "скопировать ссылку на урок"
        
        await fetch("https://api.goodschool.online/change_student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                where: {
                    id: +(localStorage.getItem("id_student") + ""),
                    name: localStorage.getItem("name"),
                    surname: localStorage.getItem("surname"),
                },
                data: "Zoom"
            })
        })
    }
})


button_1_copy_phone.addEventListener('click', () => {
    if (button_1_copy_phone.className != "igs_button_universal_B1 transparent_button") return
    if (detect.mobile() == null) {
        navigator.clipboard.writeText(text_copy_phone).then(function () {
            console.log('Текст успешно скопирован в буфер обмена');
            button_1_copy_phone.classList.add("button_active")
            button_1_copy_phone.innerText = "телефон скопирован"
            setTimeout(() => {
                button_1_copy_phone.classList.remove("button_active")
                button_1_copy_phone.innerText = "скопировать телефон"
            }, 5000)
        }, function (err) {
            console.error('Произошла ошибка при копировании текста: ', err);
        });
    }
})
link_to_lesson.addEventListener('click', async () => {
    if (link_to_lesson.className != "igs_button_universal_B1 transparent_button") return
    let get_student = await fetch("https://api.goodschool.online/get_student_for_s", {
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
    get_student = await get_student.json()
    let get_teacher = await fetch("https://api.goodschool.online/get_teacher_for_s", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_student") + ""),
            name:localStorage.getItem("name"),
            surname:localStorage.getItem("surname"),
        })
    }) as any
    get_teacher = await get_teacher.json()
    // console.log(JSON.parse(get_teacher.lesson_link));
    let timetable_classes = JSON.parse(get_teacher.timetable_classes)
    let new_Date = new Date
    let super_bool = false
    
    for (let i in timetable_classes) {
        // console.log(timetable_classes);
        // console.log(timetable_classes[i]);
        // console.log(timetable_classes[i].time == new_Date.getDay());
        


        // console.log(new_Date.getDay());
        console.log(new_Date.getHours());
        console.log(new_Date.getHours());
        


        if (timetable_classes[i].id == +(localStorage.getItem("id_student") + "") && timetable_classes[i].week == "this" && (timetable_classes[i].dayWeek == new_Date.getDay() && ((timetable_classes[i].time == new_Date.getHours() && new_Date.getMinutes() <= 50) || (timetable_classes[i].time == new_Date.getHours() - 1 && new_Date.getMinutes() >= 50)))) super_bool = true
        // if ((timetable_classes[i].time == new_Date.getHours() - 1 && new_Date.getMinutes() >= 50))) super_bool = true
    }

    if (super_bool) {
        if (get_student.platform_lesson == "Zoom") {
            navigator.clipboard.writeText(JSON.parse(get_teacher.lesson_link)[1]).then(function () {
                console.log('Текст успешно скопирован в буфер обмена');
                link_to_lesson.classList.add("button_active")
                link_to_lesson.innerText = "ссылка скопирована"
                setTimeout(() => {
                    link_to_lesson.classList.remove("button_active")
                    link_to_lesson.innerText = "скопировать ссылку на урок"
                }, 5000)
            }, function (err) {
                console.error('Произошла ошибка при копировании текста: ', err);
            });
        }
        else if (get_student.platform_lesson == "Discord") {
            navigator.clipboard.writeText(JSON.parse(get_teacher.lesson_link)[0]).then(function () {
                console.log('Текст успешно скопирован в буфер обмена');
                link_to_lesson.classList.add("button_active")
                link_to_lesson.innerText = "ник скопирован"
                setTimeout(() => {
                    link_to_lesson.classList.remove("button_active")
                    link_to_lesson.innerText = "скопировать ник учителя"
                }, 5000)
            }, function (err) {
                console.error('Произошла ошибка при копировании текста: ', err);
            });

        }
        else {
            navigator.clipboard.writeText(JSON.parse(get_teacher.lesson_link)[1]).then(function () {
                console.log('Текст успешно скопирован в буфер обмена');
                link_to_lesson.classList.add("button_active")
                link_to_lesson.innerText = "ссылка скопирована"
                setTimeout(() => {
                    link_to_lesson.classList.remove("button_active")
                    link_to_lesson.innerText = "скопировать ссылку на урок"
                }, 5000)
            }, function (err) {
                console.error('Произошла ошибка при копировании текста: ', err);
            });
        }
    }
    else {

        const notification_block_background = document.querySelector(".notification_block_background") as HTMLDivElement
        notification_block_background.style.display = "flex"
    }
})
notification_button.addEventListener("click", () => {
    const notification_block_background = document.querySelector(".notification_block_background") as HTMLDivElement
    notification_block_background.style.display = "none"
})


