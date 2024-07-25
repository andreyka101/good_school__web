import "./style.scss"

const timetableClasses_thisWeek = document.querySelector("#timetable_classes_this_week") as HTMLDivElement
const timetableClasses_nextWeek = document.querySelector("#timetable_classes_next_week") as HTMLDivElement
let str_timetableClasses_thisWeek = ""
let str_timetableClasses_nextWeek = ""
let data_now = new Date().getDay()
let obj = [
    {
        "type": "work",
        "dayWeek": 0,
        "time": 15,
        "week": "this",
    },
    {
        "type": "work",
        "dayWeek": 4,
        "time": 9,
        "week": "next",
    },
    {
        "type": "work",
        "dayWeek": 1,
        "time": 12,
        "week": "next",
    },
    {
        "type": "busyAlways",
        "dayWeek": 1,
        "time": 10,
        "week": "next",
    },
    {
        "type": "busyAlways",
        "dayWeek": 3,
        "time": 18,
        "week": "next",
    },
]


function render_timetable(){
str_timetableClasses_thisWeek = ""
str_timetableClasses_nextWeek = ""
timetableClasses_thisWeek.innerHTML = ''
timetableClasses_nextWeek.innerHTML = ''
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
            for (let i in obj) {
                if (((obj[i].dayWeek == day && obj[i].time == time) || (obj[i].dayWeek == 0 && obj[i].time == time && day == 7)) && obj[i].week != "next" && obj[i].type == "work") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
                if (((obj[i].dayWeek == day && obj[i].time == time) || (obj[i].dayWeek == 0 && obj[i].time == time && day == 7)) && obj[i].week != "next" && obj[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
            }
            if (time_block != "") str_timetableClasses_thisWeek += time_block
            else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
        }
        else {
            let time_block = ""
            for (let i in obj) {
                if (((obj[i].dayWeek == day && obj[i].time == time) || (obj[i].dayWeek == 0 && obj[i].time == time && day == 7)) && obj[i].week != "next" && obj[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
            }
            if (time_block != "") str_timetableClasses_thisWeek += time_block
            else str_timetableClasses_thisWeek += `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
        }
        let time_block = ""
        for (let i in obj) {
            if (((obj[i].dayWeek == day && obj[i].time == time) || (obj[i].dayWeek == 0 && obj[i].time == time && day == 7)) && obj[i].type == "work") time_block = `<div data-time="${time}" data-day="${day}" class="time_work"></div>`
            if (((obj[i].dayWeek == day && obj[i].time == time) || (obj[i].dayWeek == 0 && obj[i].time == time && day == 7)) && obj[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
        }
        if (time_block != "") str_timetableClasses_nextWeek += time_block
        else str_timetableClasses_nextWeek += `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
    }
}
timetableClasses_thisWeek.innerHTML = str_timetableClasses_thisWeek
timetableClasses_nextWeek.innerHTML = str_timetableClasses_nextWeek
}
render_timetable()

timetableClasses_nextWeek?.addEventListener("click", (e)=>{
    let target = e.target as HTMLDivElement
    if(target.tagName == "SPAN" || target.className == "timetable_classes") return
    
    
    if(target.className == "time_none"){
        obj.push({
            "type": "busyAlways",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "next",
        })
    }
    if(target.className == "time_busyAlways"){
        for (let i in obj){
            if(obj[i].dayWeek == +(target.dataset["day"] + "") && obj[i].time == +(target.dataset["time"] + "")){
                obj.splice(+(i),1)
                console.log(i);
                
            }
        }
    }
    render_timetable()
})


timetableClasses_thisWeek?.addEventListener("click", (e)=>{
    let target = e.target as HTMLDivElement
    if(target.tagName == "SPAN" || target.className == "timetable_classes") return
    if(target.className == "time_none"){
        obj.push({
            "type": "busyAlways",
            "dayWeek": +(target.dataset["day"] + ""),
            "time": +(target.dataset["time"] + ""),
            "week": "this",
        })
    }
    if(target.className == "time_busyAlways"){
        for (let i in obj){
            if(obj[i].dayWeek == +(target.dataset["day"] + "") && obj[i].time == +(target.dataset["time"] + "")){
                obj.splice(+(i),1)
                console.log(i);
                
            }
        }
    }
    render_timetable()
})



