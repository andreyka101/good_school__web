import "./style.scss"

let userNameSurname_div = document.querySelector(".blockTop_name .user_name_surname") as HTMLDivElement
const timetableClasses_thisWeek = document.querySelector("#timetable_classes_this_week") as HTMLDivElement
let str_timetableClasses_thisWeek = ""
let data_now = new Date().getDay()
let timetable_classes_arr: any

userNameSurname_div.innerText = localStorage.getItem("name") + " " + localStorage.getItem("surname")


async function start_page() {
    let data = await fetch("http://localhost:3000/get_student_start_page", {
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
        localStorage.setItem("id_teacher", "")
        localStorage.setItem("id_student", "")
        window.location.href = "./"
    }
}
start_page()

async function render_timetable_start() {
    try {

        let data = await fetch("http://localhost:3000/get_teacher", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: +(localStorage.getItem("id_teacher") + "")
            })
        }) as any
        data = await data.json()
        // console.log(data);
        timetable_classes_arr = JSON.parse(data.timetable_classes)
        str_timetableClasses_thisWeek = ""
        timetableClasses_thisWeek.innerHTML = ''
        // console.log("data");
        for (let time = 8; time != 22; time++) {
            let derivation_on = false
            str_timetableClasses_thisWeek += `<span class="text_grid_time">
        ${time}.00
        </span>`
            for (let day = 1; day != 8; day++) {
                let time_block = ""
                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work" && timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                    // if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    // if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyTemporarily") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
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
    }
    catch {
        localStorage.setItem("name", "")
        localStorage.setItem("surname", "")
        localStorage.setItem("id_teacher", "")
        window.location.href = "./"
    }
}
render_timetable_start()

