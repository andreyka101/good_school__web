import "./style.scss"

const timetableClasses_thisWeek = document.querySelector("#timetable_classes_this_week") as HTMLDivElement
const timetableClasses_nextWeek = document.querySelector("#timetable_classes_next_week") as HTMLDivElement
const button_save = document.querySelector("#button_save") as HTMLButtonElement
let str_timetableClasses_thisWeek = ""
let str_timetableClasses_nextWeek = ""
let data_now = new Date().getDay()
let timetable_classes_arr:any
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

async function start_page(){
    let data = await fetch("http://192.168.31.204:3000/get_teacher", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(17+"")
        })
    }) as any
    data = await data.json()
    console.log(data);
    timetable_classes_arr = JSON.parse(data.timetable_classes)
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
                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyTemporarily") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
                if (time_block != "") str_timetableClasses_thisWeek += time_block
                else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
            }
            else {
                let time_block = ""
                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                }
                if (time_block != "") str_timetableClasses_thisWeek += time_block
                else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
            }
            let time_block = ""
            for (let i in timetable_classes_arr) {
                if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "busyTemporarily" && timetable_classes_arr[i].week == "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
            }
            if (time_block != "") str_timetableClasses_nextWeek += time_block
            else str_timetableClasses_nextWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
        }
    }
    timetableClasses_thisWeek.innerHTML = str_timetableClasses_thisWeek
    timetableClasses_nextWeek.innerHTML = str_timetableClasses_nextWeek
    return JSON.parse(data.timetable_classes)
    
}

timetable_classes_arr = start_page()

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
                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyTemporarily") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
                if (time_block != "") str_timetableClasses_thisWeek += time_block
                else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
            }
            else {
                let time_block = ""
                for (let i in timetable_classes_arr) {
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                }
                if (time_block != "") str_timetableClasses_thisWeek += time_block
                else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
            }
            let time_block = ""
            for (let i in timetable_classes_arr) {
                if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "work") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].type == "busyTemporarily" && timetable_classes_arr[i].week == "next") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
            }
            if (time_block != "") str_timetableClasses_nextWeek += time_block
            else str_timetableClasses_nextWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
        }
    }
    timetableClasses_thisWeek.innerHTML = str_timetableClasses_thisWeek
    timetableClasses_nextWeek.innerHTML = str_timetableClasses_nextWeek
}
// render_timetable()


timetableClasses_nextWeek?.addEventListener("click", (e) => {
    let target = e.target as HTMLDivElement
    if (target.tagName == "SPAN" || target.className == "timetable_classes") return


    if (target.className == "time_none") {
        timetable_classes_arr.push({
            "type": "busyAlways",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "next",
        })
    }
    if (target.className == "time_busyAlways") {
        for (let i in timetable_classes_arr) {
            if (timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "")) {
                timetable_classes_arr.splice(+(i), 1)
                console.log(i);

            }
        }
    }
    if (target.className == "time_busyTemporarily") {
        for (let i in timetable_classes_arr) {
            if (timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "") && timetable_classes_arr[i].week == "next") {
                timetable_classes_arr.splice(+(i), 1)
                console.log(i);

            }
        }
    }
    render_timetable()
})


timetableClasses_thisWeek?.addEventListener("click", (e) => {
    let target = e.target as HTMLDivElement
    if (target.tagName == "SPAN" || target.className == "timetable_classes") return
    if (target.className == "time_none") {
        for (let i in timetable_classes_arr) {

            if (timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "") && timetable_classes_arr[i].type == "busyAlways") {
                timetable_classes_arr.splice(+(i), 1)
            }
        }
        timetable_classes_arr.push({
            "type": "busyAlways",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "this",
        })
    }
    if (target.className == "time_busyAlways") {
        for (let i in timetable_classes_arr) {
            if (timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "")) {
                timetable_classes_arr.splice(+(i), 1)
            }
        }
    }
    if (target.className == "time_busyTemporarily") {
        for (let i in timetable_classes_arr) {
            if (timetable_classes_arr[i].dayWeek == +(target.dataset["day"] + "") && timetable_classes_arr[i].time == +(target.dataset["time"] + "") && timetable_classes_arr[i].week == "this") {
                timetable_classes_arr.splice(+(i), 1)
                console.log(i);

            }
        }
    }
    render_timetable()
})


timetableClasses_thisWeek?.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    let target = e.target as HTMLDivElement
    if (target.tagName == "SPAN" || target.className == "timetable_classes") return
    console.log(898);

    if (target.className == "time_none") {
        timetable_classes_arr.push({
            "type": "busyTemporarily",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "this",
        })
    }
    render_timetable()
})


timetableClasses_nextWeek?.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    let target = e.target as HTMLDivElement
    if (target.tagName == "SPAN" || target.className == "timetable_classes") return
    console.log(898);

    if (target.className == "time_none") {
        timetable_classes_arr.push({
            "type": "busyTemporarily",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "next",
        })
    }
    render_timetable()
})


button_save?.addEventListener("click", async ()=>{
    let data = await fetch("http://localhost:3000/change_teacher", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            where:{
                id: +(localStorage.getItem("id_teacher")+"")
            },
            data:{
                timetable_classes:JSON.stringify(timetable_classes_arr)

            }
        })
    }) as any
    data = await data.json()
    if(data.id == +(localStorage.getItem("id_teacher")+"")) window.location.href = "./personal_area_teacher.html"
})



