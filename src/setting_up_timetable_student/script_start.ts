import "./style.scss"
console.log(0);


const h3_html = document.querySelector("h3") as HTMLDivElement
const timetableClasses_thisWeek = document.querySelector("#timetable_classes_this_week") as HTMLDivElement
const timetableClasses_nextWeek = document.querySelector("#timetable_classes_next_week") as HTMLDivElement
const button_save = document.querySelector("#button_save") as HTMLButtonElement
// const button_back_global = document.querySelector(".back_global") as HTMLButtonElement
let str_timetableClasses_thisWeek = ""
let str_timetableClasses_nextWeek = ""
let data_now = new Date().getDay()
let timetable_classes_user = [] as any
let timetable_classes_arr: any
let timetable_classes_groups_arr: any
let data_student = JSON.parse(localStorage.getItem("dataUser") + "") as any
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



async function render_timetable_start() {
    if ((localStorage.getItem("classes_status_user") + "").split(" ")[0].split("_")[1] == "group") {
        const instruction_div = document.querySelector("#instruction_individual") as HTMLDivElement
        instruction_div.style.display = "none"
    }
    else {
        const instruction_div = document.querySelector("#instruction_group") as HTMLDivElement
        instruction_div.style.display = "none"
    }

    let data = await fetch("https://api.goodschool.online/get_teacher_for_t_s", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            item: data_student.item_teacher
        })
    }) as any
    data = await data.json()
    console.log(JSON.parse(data.timetable_classes));
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
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work"){
                            if(timetable_classes_arr[i].id == localStorage.getItem("id_student") && timetable_classes_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
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
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work") {
                            if(timetable_classes_arr[i].id == localStorage.getItem("id_student") && timetable_classes_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
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
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work") {
                            if (timetable_classes_arr[i].id == localStorage.getItem("id_student") && timetable_classes_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                            else if (timetable_classes_arr[i].id != localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
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
                        if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work") {
                            if (timetable_classes_arr[i].id == localStorage.getItem("id_student") && timetable_classes_arr[i].week != "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                            else if (timetable_classes_arr[i].id != localStorage.getItem("id_student")) time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
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
        h3_html.style.display = "none"
        timetable_classes_arr.push({
            "type": "work",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "next",
            "id": +(localStorage.getItem("id_student") + ""),
        })
        timetable_classes_user.push({
            "type": "work",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "next",
        })
    }
    if (target.className == "time_work") {
        for (let i in timetable_classes_arr) {
            if (timetable_classes_arr[i].id == +(localStorage.getItem("id_student") + "") && timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "")) {
                timetable_classes_arr.splice(+(i), 1)
                console.log(i);
            }
        }
        for (let i in timetable_classes_user) {
            if (timetable_classes_user[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_user[i].time == +(target.dataset["time"] + "")) {
                timetable_classes_user.splice(+(i), 1)
                console.log(i);
            }
        }
        window.navigator.vibrate(70)
    }
    render_timetable()
    console.log(timetable_classes_user);

    // window.navigator.vibrate(200)
})


timetableClasses_thisWeek?.addEventListener("click", (e) => {
    let target = e.target as HTMLDivElement
    if (target.tagName == "SPAN" || target.className == "timetable_classes") return
    if (target.className == "time_none") {
        h3_html.style.display = "none"
        for (let i in timetable_classes_arr) {

            if (timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "") && timetable_classes_arr[i].type == "work") {
                timetable_classes_arr.splice(+(i), 1)
            }
        }
        for (let i in timetable_classes_user) {

            if (timetable_classes_user[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_user[i].time == +(target.dataset["time"] + "") && timetable_classes_user[i].type == "work") {
                timetable_classes_user.splice(+(i), 1)
            }
        }
        timetable_classes_arr.push({
            "type": "work",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "this",
            "id": +(localStorage.getItem("id_student") + ""),
        })
        timetable_classes_user.push({
            "type": "work",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "this",
        })
    }
    if (target.className == "time_work") {
        for (let i in timetable_classes_arr) {
            if (timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "") && timetable_classes_arr[i].week == "this") {
                timetable_classes_arr.splice(+(i), 1)
                console.log(i);

            }
        }
        for (let i in timetable_classes_user) {
            if (timetable_classes_user[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_user[i].time == +(target.dataset["time"] + "") && timetable_classes_user[i].week == "this") {
                timetable_classes_user.splice(+(i), 1)
                console.log(i);

            }
        }
        window.navigator.vibrate(70)
    }
    render_timetable()
})



button_save?.addEventListener("click", async () => {
    if(timetable_classes_user.length == 0){
        h3_html.style.display = "block"
        return
    }
        let data_user_all = JSON.parse(localStorage.getItem("dataUser") as string)
        data_user_all = Object.assign(data_user_all,{"timetable_classes_student":JSON.stringify(timetable_classes_user)})
        data_user_all = Object.assign(data_user_all,{"first_payment":(localStorage.getItem("classes_status_user") + "").split(" ")[1]})
        data_user_all = Object.assign(data_user_all,{"type_class":(localStorage.getItem("classes_status_user") + "").split(" ")[0]})
        
        let data = await fetch("https://api.goodschool.online/registration_student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data_user_all)
        }) as any
        data = await data.json()
        console.log(data);
        if(data.name == JSON.parse(localStorage.getItem("dataUser") as string).name && data.type_class == (localStorage.getItem("classes_status_user") + "").split(" ")[0] && data.first_payment == (localStorage.getItem("classes_status_user") + "").split(" ")[1]){
            localStorage.setItem("name",data.name)
            localStorage.setItem("surname",data.surname)
            localStorage.setItem("id_student",data.id)
            console.log();
            window.location.href = "./check_amount_start.html"
        }
})

