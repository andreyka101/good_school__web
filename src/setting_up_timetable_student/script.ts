import "./style.scss"
console.log(0);


const timetableClasses_thisWeek = document.querySelector("#timetable_classes_this_week") as HTMLDivElement
const timetableClasses_nextWeek = document.querySelector("#timetable_classes_next_week") as HTMLDivElement
const button_save = document.querySelector("#button_save") as HTMLButtonElement
const button_back_global = document.querySelector(".back_global") as HTMLButtonElement
const notification_timetable = document.querySelector("#notification_timetable") as HTMLDivElement
const notification_timetable_button = document.querySelector("#notification_timetable button") as HTMLDivElement
const notification_exit_yes = document.querySelector("#notification_exit #yes") as HTMLButtonElement
const notification_exit_no = document.querySelector("#notification_exit #no") as HTMLButtonElement
let str_timetableClasses_thisWeek = ""
let str_timetableClasses_nextWeek = ""
let data_now = new Date().getDay()
console.log(data_now);


let timetable_classes_arr: any
let timetable_classes_groups_arr: any
// let timetable_classes_arr = [
//     {
//         "type": "work",
//         "dayWeek": 0,
//         "time": 15,
//         "week": "this",
//     },
//     {
//         "type": "work",
//         "dayWeek": 4,
//         "time": 9,
//         "week": "next",
//     },
//     {
//         "type": "work",
//         "dayWeek": 1,
//         "time": 12,
//         "week": "this",
//     },
//     {
//         "type": "busyAlways",
//         "dayWeek": 1,
//         "time": 10,
//         "week": "next",
//     },
//     {
//         "type": "busyAlways",
//         "dayWeek": 3,
//         "time": 18,
//         "week": "next",
//     },
// ]

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
        localStorage.setItem("id_teacher", "")
        localStorage.setItem("id_student", "")
        window.location.href = "./"
    }
}
start_page()

async function render_timetable_start() {
    console.log((localStorage.getItem("classes_status_user") + "").split(" ")[0].split("_")[1]);
    if ((localStorage.getItem("classes_status_user") + "").split(" ")[0].split("_")[1] == "group") {
        const instruction_div = document.querySelector("#instruction_individual") as HTMLDivElement
        instruction_div.style.display = "none"
    }
    else {
        const instruction_div = document.querySelector("#instruction_group") as HTMLDivElement
        instruction_div.style.display = "none"
    }

    let data = await fetch("https://api.goodschool.online/get_teacher_for_s", {
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
    console.log(data);
    timetable_classes_arr = JSON.parse(data.timetable_classes)
    timetable_classes_groups_arr = JSON.parse(data.timetable_classes_groups)
    str_timetableClasses_thisWeek = ""
    str_timetableClasses_nextWeek = ""
    timetableClasses_thisWeek.innerHTML = ''
    timetableClasses_nextWeek.innerHTML = ''
    console.log("data");
    for (let time = 8; time != 22; time++) {
        str_timetableClasses_thisWeek += `<span class="text_grid_time">
        ${time}.00
        </span>`
        str_timetableClasses_nextWeek += `<span class="text_grid_time">
                    ${time}.00
                </span>`
        for (let day = 1; day != 8; day++) {
            if (day > data_now && data_now != 0) {
                let time_block = ""
                if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "1-8_individual") {

                    for (let i in timetable_classes_arr) {
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") {
                            if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                            else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                        }
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyTemporarily") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                    }
                    for (let i in timetable_classes_groups_arr) {
                        if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                    if (time_block != "") str_timetableClasses_thisWeek += time_block
                    else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
                }
                if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_group" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_group") {

                    for (let i in timetable_classes_groups_arr) {
                        if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
                    }
                    for (let i in timetable_classes_arr) {
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work" && timetable_classes_arr[i].week != "next") {
                            if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                            // else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                        }
                    }
                    if (time_block != "") str_timetableClasses_thisWeek += time_block
                    else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_none_X"></div>`
                }
            }
            else {
                let time_block = ""
                if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "1-8_individual") {

                    for (let i in timetable_classes_arr) {
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") {
                            if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                            else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                        }
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                    for (let i in timetable_classes_groups_arr) {
                        if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                    if (time_block != "") str_timetableClasses_thisWeek += time_block
                    else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
                if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_group" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_group") {

                    // for (let i in timetable_classes_groups_arr) {
                    //     if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
                    // }
                    if (time_block != "") str_timetableClasses_thisWeek += time_block
                    else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
            }
            let time_block = ""
            if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "1-8_individual") {

                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work" && timetable_classes_arr[i].week != "not_next") {
                        if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                        else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "busyTemporarily" && timetable_classes_arr[i].week == "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
                for (let i in timetable_classes_groups_arr) {
                    if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                }
                if (time_block != "") str_timetableClasses_nextWeek += time_block
                else str_timetableClasses_nextWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
            }
            if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_group" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_group") {
                for (let i in timetable_classes_groups_arr) {
                    if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups") time_block = `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
                }
                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work" && timetable_classes_arr[i].week != "not_next") {
                        if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                        // else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                }
                if (time_block != "") str_timetableClasses_nextWeek += time_block
                else str_timetableClasses_nextWeek += `<div data-time="${time}" data-day="${day}" class="time_none_X"></div>`
            }
        }
    }
    timetableClasses_thisWeek.innerHTML = str_timetableClasses_thisWeek
    timetableClasses_nextWeek.innerHTML = str_timetableClasses_nextWeek
    return JSON.parse(data.timetable_classes)

}

timetable_classes_arr = render_timetable_start()


function render_timetable() {
    str_timetableClasses_thisWeek = ""
    str_timetableClasses_nextWeek = ""
    timetableClasses_thisWeek.innerHTML = ''
    timetableClasses_nextWeek.innerHTML = ''
    console.log("data");
    for (let time = 8; time != 22; time++) {
        str_timetableClasses_thisWeek += `<span class="text_grid_time">
        ${time}.00
        </span>`
        str_timetableClasses_nextWeek += `<span class="text_grid_time">
                    ${time}.00
                </span>`
        for (let day = 1; day != 8; day++) {
            if (day > data_now && data_now != 0) {
                let time_block = ""
                if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "1-8_individual") {

                    for (let i in timetable_classes_arr) {
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") {
                            if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                            else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                        }
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyTemporarily") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                    }
                    for (let i in timetable_classes_groups_arr) {
                        if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                    if (time_block != "") str_timetableClasses_thisWeek += time_block
                    else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
                }
                if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_group" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_group") {

                    for (let i in timetable_classes_groups_arr) {
                        if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
                    }
                    for (let i in timetable_classes_arr) {
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work" && timetable_classes_arr[i].week != "next") {
                            if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                            // else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                        }
                    }
                    if (time_block != "") str_timetableClasses_thisWeek += time_block
                    else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_none_X"></div>`
                }
            }
            else {
                let time_block = ""
                if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "1-8_individual") {

                    for (let i in timetable_classes_arr) {
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") {
                            if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                            else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                        }
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                    for (let i in timetable_classes_groups_arr) {
                        if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                    if (time_block != "") str_timetableClasses_thisWeek += time_block
                    else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
                if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_group" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_group") {

                    // for (let i in timetable_classes_groups_arr) {
                    //     if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
                    // }
                    if (time_block != "") str_timetableClasses_thisWeek += time_block
                    else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
            }
            let time_block = ""
            if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_individual" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "1-8_individual") {

                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work" && timetable_classes_arr[i].week != "not_next") {
                        if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                        else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "busyTemporarily" && timetable_classes_arr[i].week == "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
                for (let i in timetable_classes_groups_arr) {
                    if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                }
                if (time_block != "") str_timetableClasses_nextWeek += time_block
                else str_timetableClasses_nextWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
            }
            if ((localStorage.getItem("classes_status_user") + "").split(" ")[0] == "9-11_group" || (localStorage.getItem("classes_status_user") + "").split(" ")[0] == "programming_group") {
                for (let i in timetable_classes_groups_arr) {
                    if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups") time_block = `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
                }
                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work" && timetable_classes_arr[i].week != "not_next") {
                        if (timetable_classes_arr[i].id == localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                        // else time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    }
                }
                if (time_block != "") str_timetableClasses_nextWeek += time_block
                else str_timetableClasses_nextWeek += `<div data-time="${time}" data-day="${day}" class="time_none_X"></div>`
            }
        }
    }
    timetableClasses_thisWeek.innerHTML = str_timetableClasses_thisWeek
    timetableClasses_nextWeek.innerHTML = str_timetableClasses_nextWeek
}
// render_timetable()


timetableClasses_nextWeek?.addEventListener("click", (e) => {
    let target = e.target as HTMLDivElement
    if (target.tagName == "SPAN" || target.className == "timetable_classes") return
    console.log(timetable_classes_arr);


    if (target.className == "time_none") {
        let lesson_bool = true
        for (let i in timetable_classes_arr) {
            if (timetable_classes_arr[i].id == +(localStorage.getItem("id_student") + "") && timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "") && timetable_classes_arr[i].week == "not_next") {
                lesson_bool = false
                timetable_classes_arr[i].week = "this"
            }
        }
        if (lesson_bool) {
            timetable_classes_arr.push({
                "type": "work",
                "dayWeek": +(target.dataset["day"] + ""),
                "time": +(target.dataset["time"] + ""),
                "week": "next",
                "id": +(localStorage.getItem("id_student") + ""),
            })
        }
    }
    if (target.className == "time_work") {
        for (let i in timetable_classes_arr) {
            if (timetable_classes_arr[i].id == +(localStorage.getItem("id_student") + "") && timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "") && timetable_classes_arr[i].week == "this") {
                // timetable_classes_arr.splice(+(i), 1)
                timetable_classes_arr[i].week = "not_next"
                console.log(i);

            }
            if (timetable_classes_arr[i].id == +(localStorage.getItem("id_student") + "") && timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "") && timetable_classes_arr[i].week == "next") {
                timetable_classes_arr.splice(+(i), 1)
                // timetable_classes_arr[i].week = "not_next"
                console.log(i);

            }
        }
        window.navigator.vibrate(70)
    }
    render_timetable()

    // window.navigator.vibrate(200)
})





button_save?.addEventListener("click", async () => {
    start_page()

    let data = await fetch("https://api.goodschool.online/change_teacher_for_s", {
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
            data: JSON.stringify(timetable_classes_arr)
        })
    }) as any
    data = await data.json()
    if (data.ok) window.location.href = "./personal_area_student.html"
})




button_back_global?.addEventListener("click", async () => {
    start_page()
    const notification_exit = document.querySelector("#notification_exit") as HTMLDivElement
    notification_exit.style.display = "flex"
})


notification_exit_yes?.addEventListener("click", async () => {
    let data = await fetch("https://api.goodschool.online/change_teacher_for_s", {
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
            data: JSON.stringify(timetable_classes_arr)
        })
    }) as any
    data = await data.json()
    if (data.ok) window.location.href = "./personal_area_student.html"
})

notification_exit_no?.addEventListener("click", () => {
    window.location.href = "./personal_area_student.html"
})


timetableClasses_thisWeek?.addEventListener("click", () => {
    notification_timetable.style.display = "flex"
})
notification_timetable_button?.addEventListener("click", () => {
    notification_timetable.style.display = "none"
})



