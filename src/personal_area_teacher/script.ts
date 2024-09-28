import "./style.scss"

let userNameSurname_div = document.querySelector(".blockTop_name .user_name_surname") as HTMLDivElement
const timetableClasses_thisWeek = document.querySelector("#timetable_classes_this_week") as HTMLDivElement
const save_links_platforms = document.querySelector(".links_platforms #save_links_platforms") as HTMLButtonElement
const inp_1_links_platforms = document.querySelector('#inp_1') as HTMLInputElement
const inp_2_links_platforms = document.querySelector('#inp_2') as HTMLInputElement
// let button_phone = document.querySelector("#button_phone") as HTMLButtonElement
let button_phone:HTMLButtonElement
let student_choice:HTMLDivElement
let str_timetableClasses_thisWeek = ""
let data_now = new Date().getDay()
let timetable_classes_arr: any
let timetable_classes_groups_arr: any

userNameSurname_div.innerText = localStorage.getItem("name") + " " + localStorage.getItem("surname")


async function start_page() {
    let data = await fetch("http://192.168.31.58:3000/get_teacher_start_page", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_teacher") + "")
        })
    }) as any
    data = await data.json()
    console.log(data);
    if (data.name != localStorage.getItem("name") || data.surname != localStorage.getItem("surname")) {
        localStorage.setItem("name", "")
        localStorage.setItem("surname", "")
        localStorage.setItem("id_teacher", "")
        window.location.href = "./"
    }
}
start_page()

async function render_timetable_start() {
    try {

        let data = await fetch("http://192.168.31.58:3000/get_teacher", {
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
        if (data.timetable_classes_groups == null) timetable_classes_groups_arr = []
        else timetable_classes_groups_arr = JSON.parse(data.timetable_classes_groups)
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
                    if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work"){
                        let data = await fetch("http://192.168.31.58:3000/get_student", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({
                                id: timetable_classes_arr[i].id
                            })
                        }) as any
                        data = await data.json()
                        if(data.paid_lessons > 0){
                            time_block = `<div data-time="${time}" data-day="${day}" data-id="${timetable_classes_arr[i].id}" class="time_work"></div>`
                        }
                    }
                    // if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyAlways") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyAlways"></div>`
                    // if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "busyTemporarily") time_block = `<div data-time="${time}" data-day="${day}" class="time_busyTemporarily"></div>`
                }
                for (let i in timetable_classes_groups_arr) {
                    if (((timetable_classes_groups_arr[i].dayWeek == day && timetable_classes_groups_arr[i].time == time) || (timetable_classes_groups_arr[i].dayWeek == 0 && timetable_classes_groups_arr[i].time == time && day == 7)) && timetable_classes_groups_arr[i].type == "groups" && timetable_classes_groups_arr[i].week != "next") {
                        let num_work = 0
                        let arr_work_id = [] as Array<number>
                        for (let i in timetable_classes_arr) {
                            if (((timetable_classes_arr[i].dayWeek == day && timetable_classes_arr[i].time == time) || (timetable_classes_arr[i].dayWeek == 0 && timetable_classes_arr[i].time == time && day == 7)) && timetable_classes_arr[i].week != "next" && timetable_classes_arr[i].type == "work") {
                                let data = await fetch("http://192.168.31.58:3000/get_student", {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                    },
                                    body: JSON.stringify({
                                        id: timetable_classes_arr[i].id
                                    })
                                }) as any
                                data = await data.json()
                                if(data.paid_lessons > 0){
                                    num_work++
                                    arr_work_id.push(timetable_classes_arr[i].id)
                                }
                            }
                        }
                        console.log(num_work);
                        if (num_work > 0) time_block = `<div data-id="${JSON.stringify(arr_work_id)}" data-time="${time}" data-day="${day}" class="time_groups">${num_work}</div>`
                        else time_block = `<div data-time="${time}" data-day="${day}" class="time_none"></div>`
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
    }
    catch {
        localStorage.setItem("name", "")
        localStorage.setItem("surname", "")
        localStorage.setItem("id_teacher", "")
        window.location.href = "./"
    }
}
render_timetable_start()
async function render_link_block() {
    let data = await fetch("http://192.168.31.58:3000/get_teacher", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_teacher") + "")
        })
    }) as any
    data = await data.json()
    let data_lesson_link = data.lesson_link
    if (data_lesson_link == null) {
        data_lesson_link = ["", ""]
    }
    else {
        data_lesson_link = JSON.parse(data_lesson_link)
    }
    let span_grey_Z_D = document.querySelector("#span_grey_Z_D") as HTMLSpanElement
    if (data.item == "programming") {
        span_grey_Z_D.innerText = "Ссылка Discord"
    }
    else {
        span_grey_Z_D.innerText = "Ссылка Zoom"
    }
    inp_1_links_platforms.value = data_lesson_link[0]
    inp_2_links_platforms.value = data_lesson_link[1]
}
render_link_block()
save_links_platforms.addEventListener("click", async () => {
    // console.log(JSON.stringify([inp_1_links_platforms.value,inp_2_links_platforms.value]));

    await fetch("http://192.168.31.58:3000/change_teacher", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            where: {
                id: +(localStorage.getItem("id_teacher") + "")
            },
            data: {
                lesson_link: JSON.stringify([inp_1_links_platforms.value, inp_2_links_platforms.value])
            }
        })
    }) as any
})

timetableClasses_thisWeek.addEventListener("click", async (event) => {
    const obj_if_platform_lesson = {
        "mathematics":"Математика",
        "VLOOKUP":"ВПР",
        "algebra":"Алгебра",
        "geometry":"Геометрия",
        "computerScience":"Информатика",
        "programming":"Программирование python",
        "EGE_OGE_computerScience":"ЕГЭ, ОГЭ информатика",
        "EGE_OGE_mathematics":"ЕГЭ, ОГЭ математика",
        "basics":"Основы",
        "mobileApp":"Мобильное приложение",
        "godot":"Godot",
        "websites":"Сайты",
    } as any
    let target = event.target as HTMLElement
    if(target.className != "time_work" && target.className != "time_groups") return
    console.log(5555);
    if (target.className == "time_work") {

        const all_div_work = timetableClasses_thisWeek.querySelector(".time_work_selected")
        if (all_div_work != null) all_div_work.classList.remove("time_work_selected")
        const all_div_groups = timetableClasses_thisWeek.querySelector(".time_groups_selected")
        if (all_div_groups != null) all_div_groups.classList.remove("time_groups_selected")
        console.log(target);
        target.classList.add("time_work_selected")
        let data = await fetch("http://192.168.31.58:3000/get_student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: +(target.dataset.id + "")
            })
        }) as any
        data = await data.json()
        console.log(data);
        const student_data = document.querySelector(".student_data") as HTMLDivElement
        student_choice = document.querySelector(".student_choice") as HTMLDivElement
        student_data.innerHTML = `
            <span class="span_grey">
                Ученик ${data.surname} ${data.name}
            </span>
            <span class="span_grey">
                <div>
                    Класс ${data.class}
                </div>
                <div>
                    ${obj_if_platform_lesson[data.item]}
                </div>
                <div>
                    ${data.platform_lesson}
                </div>
            </span>
            <span class="span_grey">
                Оплаченные занятия: ${data.paid_lessons}
            </span>
            <button class="igs_button_universal_B1" data-phone="${data.phone}" id="button_phone">
                скопровать телефон
            </button>
        `
        student_choice.innerHTML = `
            <div class="student_work student_selected">1</div>
            <div class="student_none"></div>
            <div class="student_none"></div>
            <div class="student_none"></div>
            <div class="student_none"></div>
        `
        console.log(student_data);
    }
    if (target.className == "time_groups") {
        console.log(button_phone);
        
        const all_div_work = timetableClasses_thisWeek.querySelector(".time_work_selected")
        if (all_div_work != null) all_div_work.classList.remove("time_work_selected")
        const all_div_groups = timetableClasses_thisWeek.querySelector(".time_groups_selected")
        if (all_div_groups != null) all_div_groups.classList.remove("time_groups_selected")
        target.classList.add("time_groups_selected")
        console.log(JSON.parse(target.dataset.id + ""));
        let data = await fetch("http://192.168.31.58:3000/get_student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: +(JSON.parse(target.dataset.id + "")[0] + "")
            })
        }) as any
        data = await data.json()
        console.log(data);
        const student_data = document.querySelector(".student_data") as HTMLDivElement
        student_choice = document.querySelector(".student_choice") as HTMLDivElement
        student_data.innerHTML = `
            <span class="span_grey">
                Ученик ${data.surname} ${data.name}
            </span>
            <span class="span_grey">
                <div>
                    Класс ${data.class}
                </div>
                <div>
                    ${obj_if_platform_lesson[data.item]}
                </div>
                <div>
                    ${data.platform_lesson}
                </div>
            </span>
            <span class="span_grey">
                Оплаченные занятия: ${data.paid_lessons}
            </span>
            <button class="igs_button_universal_B1" data-phone="${data.phone}" id="button_phone">
                скопровать телефон
            </button>
        `
        student_choice.innerHTML = `
            <div class="student_work student_selected" data-id="${JSON.parse(target.dataset.id + "")[0]}">1</div>
        `
        for(let i=1; i != JSON.parse(target.dataset.id + "").length; i++){
            student_choice.innerHTML += `
                <div class="student_work" data-id="${JSON.parse(target.dataset.id + "")[i]}">${i+1}</div>
            `
        }
        if(JSON.parse(target.dataset.id + "").length < 5){
            for(let i=0; i != 5 - JSON.parse(target.dataset.id + "").length; i++){
                student_choice.innerHTML += `
                    <div class="student_none"></div>
                `
            }
        }
        // student_choice.innerHTML = `
        //     <div class="student_work student_selected">1</div>
        //     <div class="student_none"></div>
        //     <div class="student_none"></div>
        //     <div class="student_none"></div>
        //     <div class="student_none"></div>
        // `
    }
    button_phone = document.querySelector("#button_phone") as HTMLButtonElement
    button_phone.addEventListener('click',()=>{
        navigator.clipboard.writeText(button_phone.dataset.phone + "").then(function() {
            console.log('Текст успешно скопирован в буфер обмена');
            button_phone.classList.add("button_active")
            button_phone.innerText = "ссылка скопирована"
            setTimeout(()=>{
                button_phone.classList.remove("button_active")
                button_phone.innerText = "скопировать ссылку на урок"
            },5000)
          }, function(err) {
            console.error('Произошла ошибка при копировании текста: ', err);
          });
    })
    
    student_choice.addEventListener('click', async (event)=>{
        let target = event.target as HTMLDivElement
        if(target.className != "student_work") return
        const student_selected = student_choice.querySelector(".student_selected")
        student_selected?.classList.remove("student_selected")
        target?.classList.add("student_selected")
        console.log(999);
        let data = await fetch("http://192.168.31.58:3000/get_student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: +(target.dataset.id + "")
            })
        }) as any
        data = await data.json()
        console.log(data);
        const student_data = document.querySelector(".student_data") as HTMLDivElement
        student_data.innerHTML = `
            <span class="span_grey">
                Ученик ${data.surname} ${data.name}
            </span>
            <span class="span_grey">
                <div>
                    Класс ${data.class}
                </div>
                <div>
                    ${obj_if_platform_lesson[data.item]}
                </div>
                <div>
                    ${data.platform_lesson}
                </div>
            </span>
            <span class="span_grey">
                Оплаченные занятия: ${data.paid_lessons}
            </span>
            <button class="igs_button_universal_B1" data-phone="${data.phone}" id="button_phone">
                скопровать телефон
            </button>
        `
    })
})
