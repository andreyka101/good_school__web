import "./style.scss"
import { md5 } from 'js-md5';

const name_input = document.querySelector("#name_input") as HTMLInputElement
const surname_input = document.querySelector("#surname_input") as HTMLInputElement
const phone_input = document.querySelector("#phone_input") as HTMLInputElement
const email_input = document.querySelector("#email_input") as HTMLInputElement
const password_input = document.querySelector("#password_input") as HTMLInputElement
const repeatPassword_input = document.querySelector("#repeatPassword_input") as HTMLInputElement
const class_select = document.querySelector("#class_select") as HTMLSelectElement
const s0_select = document.querySelector("#s0_select") as HTMLSelectElement
const s1_select = document.querySelector("#s1_select") as HTMLSelectElement
const s2_select = document.querySelector("#s2_select") as HTMLSelectElement
const s3_select = document.querySelector("#s3_select") as HTMLSelectElement
const s4_select = document.querySelector("#s4_select") as HTMLSelectElement
const name_warning = document.querySelector("#name_warning") as HTMLSpanElement
const none_warning = document.querySelector("#none_warning") as HTMLSpanElement
const surname_warning = document.querySelector("#surname_warning") as HTMLSpanElement
const class_warning = document.querySelector("#class_warning") as HTMLSpanElement
const sx_warning = document.querySelector("#sx_warning") as HTMLSpanElement
const phone_warning = document.querySelector("#phone_warning") as HTMLSpanElement
const email_warning = document.querySelector("#email_warning") as HTMLSpanElement
const password_warning = document.querySelector("#password_warning") as HTMLSpanElement
const password_min_8 = document.querySelector("#password_min_8") as HTMLSpanElement
const repeatPassword_warning = document.querySelector("#repeatPassword_warning") as HTMLSpanElement
const buttonSend_registrationStudent = document.querySelector("#buttonSend_registrationStudent") as HTMLButtonElement
const width_block = document.querySelector(".width_block") as HTMLDivElement

const patronymic_input = document.querySelector("#patronymic_input") as HTMLInputElement
const item_select = document.querySelector("#item_select") as HTMLSelectElement
const education_textarea = document.querySelector("#education_textarea") as HTMLTextAreaElement
const description_textarea = document.querySelector("#description_textarea") as HTMLTextAreaElement
const buttonSend_registrationTeacher = document.querySelector("#buttonSend_registrationTeacher") as HTMLButtonElement

const buttonSend_entrance = document.querySelector("#buttonSend_entrance") as HTMLButtonElement
console.log(window.location.href);

if(localStorage.getItem("dataUser") != "" && localStorage.getItem("dataUser") != null){
    let dataUser = JSON.parse(localStorage.getItem("dataUser") as string)
    if(window.location.href == "http://localhost:5173/entrance.html" || window.location.href == "http://192.168.31.58:5173/entrance.html"){
        name_input.value = dataUser.name
        surname_input.value = dataUser.surname
    }
    else{
        name_input.value = dataUser.name
        surname_input.value = dataUser.surname
        phone_input.value = dataUser.phone
        email_input.value = dataUser.email
        class_select.value = dataUser.class
        // name_input.value = dataUser.name
    }
}

class_select?.addEventListener("change", () => {
    if (class_select.value != "") {
        class_select.style.color = "#A64300"
        s1_select.value = ""
        s2_select.value = ""
        s3_select.value = ""
        s4_select.value = ""
        s1_select.style.color = "#757575"
        s2_select.style.color = "#757575"
        s3_select.style.color = "#757575"
        s4_select.style.color = "#757575"
        switch (class_select.value) {
            case "1-4":
                s0_select.style.display = "none"
                s1_select.style.display = "inline-block"
                s2_select.style.display = "none"
                s3_select.style.display = "none"
                s4_select.style.display = "none"
                break;
            case "5-8":
                s0_select.style.display = "none"
                s1_select.style.display = "none"
                s2_select.style.display = "inline-block"
                s3_select.style.display = "none"
                s4_select.style.display = "none"
                break;
            case "9-11":
                s0_select.style.display = "none"
                s1_select.style.display = "none"
                s2_select.style.display = "none"
                s3_select.style.display = "inline-block"
                s4_select.style.display = "none"
                break;
            case "programming":
                s0_select.style.display = "none"
                s1_select.style.display = "none"
                s2_select.style.display = "none"
                s3_select.style.display = "none"
                s4_select.style.display = "inline-block"
                break;
            default:
                s0_select.style.display = "inline-block"
                s1_select.style.display = "none"
                s2_select.style.display = "none"
                s3_select.style.display = "none"
                s4_select.style.display = "none"
                break;
        }
    }
    else {
        class_select.style.color = "#757575"
    }
})

s1_select?.addEventListener("change", () => {
    if (s1_select.value != "") {
        s1_select.style.color = "#A64300"
    }
    else {
        s1_select.style.color = "#757575"
    }
})
s2_select?.addEventListener("change", () => {
    if (s2_select.value != "") {
        s2_select.style.color = "#A64300"
    }
    else {
        s2_select.style.color = "#757575"
    }
})
s3_select?.addEventListener("change", () => {
    if (s3_select.value != "") {
        s3_select.style.color = "#A64300"
    }
    else {
        s3_select.style.color = "#757575"
    }
})
s4_select?.addEventListener("change", () => {
    if (s4_select.value != "") {
        s4_select.style.color = "#A64300"
    }
    else {
        s4_select.style.color = "#757575"
    }
})



buttonSend_registrationStudent?.addEventListener("click", async () => {
    let s_num = [] as any
    if (s1_select.value != "") s_num = s1_select.value.split(" ")
    if (s2_select.value != "") s_num = s2_select.value.split(" ")
    if (s3_select.value != "") s_num = s3_select.value.split(" ")
    if (s4_select.value != "") s_num = s4_select.value.split(" ")
    if (name_input.value.toLowerCase().trim() == "admin" && surname_input.value.toLowerCase().trim() == "root" && password_input.value == "392ab4") {
        window.location.href = "./registration_teacher.html"
    }
    else {
        if (name_input.value != "" && surname_input.value != "" && s_num != "" && phone_input.value != "" && email_input.value != "" && class_select.value != "" && password_input.value != "" && password_input.value == repeatPassword_input.value && password_input.value.length >= 6) {
            name_warning.style.display = "none"
            name_input.style.backgroundColor = "#FFCC73"
            surname_warning.style.display = "none"
            surname_input.style.backgroundColor = "#FFCC73"
            repeatPassword_warning.style.display = "none"
            repeatPassword_input.style.backgroundColor = "#FFCC73"
            password_warning.style.display = "none"
            password_input.style.backgroundColor = "#FFCC73"
            email_warning.style.display = "none"
            email_input.style.backgroundColor = "#FFCC73"
            phone_warning.style.display = "none"
            phone_input.style.backgroundColor = "#FFCC73"
            class_warning.style.display = "none"
            class_select.style.backgroundColor = "#FFCC73"
            sx_warning.style.display = "none"
            s1_select.style.backgroundColor = "#FFCC73"
            s2_select.style.backgroundColor = "#FFCC73"
            s3_select.style.backgroundColor = "#FFCC73"
            s4_select.style.backgroundColor = "#FFCC73"

            let data = await fetch("http://192.168.31.58:3000/checking_email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email: email_input.value.trim()
                })
            }) as any
            data = await data.json()
            console.log(data);
            if (data.length == 0) {
                localStorage.setItem("dataUser", JSON.stringify({
                    email: email_input.value.trim(),
                    phone: phone_input.value.trim(),
                    surname: surname_input.value.toLowerCase().trim(),
                    name: name_input.value.toLowerCase().trim(),
                    class: class_select.value,
                    password: md5(password_input.value).trim(),
                    item: s_num[0],
                    item_teacher: s_num[1],
                }))
                // localStorage.setItem("name",data.name + "")
                // localStorage.setItem("surname",data.surname + "")
                localStorage.setItem("id_student","0")
                // localStorage.setItem("id_teacher",data.teacher_id + "")
                window.location.href = "./subscription_selection_start.html"
            }
            else {
                email_warning.style.display = "inline-block"
                email_warning.innerText = "эта почта уже используется "
                // email_input.value = ""
                email_input.style.backgroundColor = "#ffb073"
            }
            // let data = await fetch("http://192.168.31.58:3000/registration_student", {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json;charset=utf-8'
            //     },
            //     body: JSON.stringify({
            //         email: email_input.value,
            //         phone: phone_input.value,
            //         surname: surname_input.value,
            //         name: name_input.value,
            //         class: class_select.value,
            //         password: md5(password_input.value),
            //         item: s_num[0],
            //         item_teacher: s_num[1],
            //     })
            // }) as any
            // data = await data.json()
            // console.log(data);
            // if (data.password == md5(password_input.value)){
            //     localStorage.setItem("name",data.name + "")
            //     localStorage.setItem("surname",data.surname + "")
            //     localStorage.setItem("id_student",data.id + "")
            //     localStorage.setItem("id_teacher",data.teacher_id + "")
            //     window.location.href = "./setting_up_timetable_student_start.html"
            // }
        }
        else {
            if (name_input.value == "") {
                name_warning.style.display = "inline-block"
                name_input.style.backgroundColor = "#ffb073"
            }
            else {
                name_warning.style.display = "none"
                name_input.style.backgroundColor = "#FFCC73"
            }
            if (surname_input.value == "") {
                surname_warning.style.display = "inline-block"
                surname_input.style.backgroundColor = "#ffb073"
            }
            else {
                surname_warning.style.display = "none"
                surname_input.style.backgroundColor = "#FFCC73"
            }
            if (password_input.value == "") {
                password_warning.style.display = "inline-block"
                password_input.style.backgroundColor = "#ffb073"
            }
            else {
                password_warning.style.display = "none"
                password_input.style.backgroundColor = "#FFCC73"
                if (password_input.value.length < 6) {
                    password_min_8.style.display = "inline-block"
                    password_input.style.backgroundColor = "#ffb073"
                }
                else {
                    password_min_8.style.display = "none"
                    password_input.style.backgroundColor = "#FFCC73"
                    if (repeatPassword_input.value != password_input.value) {
                        repeatPassword_warning.style.display = "inline-block"
                        repeatPassword_input.style.backgroundColor = "#ffb073"
                    }
                    else {
                        repeatPassword_warning.style.display = "none"
                        repeatPassword_input.style.backgroundColor = "#FFCC73"
                    }
                }
            }
            if (email_input.value == "") {
                email_warning.innerText = "не введена почта"
                email_warning.style.display = "inline-block"
                email_input.style.backgroundColor = "#ffb073"
            }
            else {
                email_warning.style.display = "none"
                email_input.style.backgroundColor = "#FFCC73"
            }
            if (phone_input.value == "") {
                phone_warning.style.display = "inline-block"
                phone_input.style.backgroundColor = "#ffb073"
            }
            else {
                phone_warning.style.display = "none"
                phone_input.style.backgroundColor = "#FFCC73"
            }
            if (class_select.value == "") {
                class_warning.style.display = "inline-block"
                class_select.style.backgroundColor = "#ffb073"
            }
            else {
                class_warning.style.display = "none"
                class_select.style.backgroundColor = "#FFCC73"
            }
            if (s_num.length == 0 && class_select.value != "") {
                sx_warning.style.display = "inline-block"
                s1_select.style.backgroundColor = "#ffb073"
                s2_select.style.backgroundColor = "#ffb073"
                s3_select.style.backgroundColor = "#ffb073"
                s4_select.style.backgroundColor = "#ffb073"
            }
            else {
                sx_warning.style.display = "none"
                s1_select.style.backgroundColor = "#FFCC73"
                s2_select.style.backgroundColor = "#FFCC73"
                s3_select.style.backgroundColor = "#FFCC73"
                s4_select.style.backgroundColor = "#FFCC73"
            }
        }
    }
})
buttonSend_registrationTeacher?.addEventListener("click", async () => {
    if (name_input.value != "" && surname_input.value != "" && phone_input.value != "" && email_input.value != "" && password_input.value != "" && password_input.value == repeatPassword_input.value && patronymic_input.value != "" && item_select.value != "" && education_textarea.value != "" && description_textarea.value != "" && password_input.value.length >= 6) {
        // name_warning.style.display = "none"
        name_input.style.backgroundColor = "#FFCC73"
        // surname_warning.style.display = "none"
        surname_input.style.backgroundColor = "#FFCC73"
        // repeatPassword_warning.style.display = "none"
        repeatPassword_input.style.backgroundColor = "#FFCC73"
        // password_warning.style.display = "none"
        password_input.style.backgroundColor = "#FFCC73"
        // email_warning.style.display = "none"
        email_input.style.backgroundColor = "#FFCC73"
        // phone_warning.style.display = "none"
        phone_input.style.backgroundColor = "#FFCC73"

        patronymic_input.style.backgroundColor = "#FFCC73"
        item_select.style.backgroundColor = "#FFCC73"
        education_textarea.style.backgroundColor = "#FFCC73"
        description_textarea.style.backgroundColor = "#FFCC73"
        let list_items: any
        if (item_select.value == "mathematics") list_items = ["mathematics"]
        else list_items = ["programming"]
        let data = await fetch("http://192.168.31.58:3000/registration_teacher", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                education: education_textarea.value.trim(),
                description: description_textarea.value.trim(),
                email: email_input.value.trim(),
                phone: phone_input.value.trim(),
                surname: surname_input.value.toLowerCase().trim(),
                name: name_input.value.toLowerCase().trim(),
                patronymic: patronymic_input.value.toLowerCase().trim(),
                password: md5(password_input.value.trim()),
                item: list_items[0],
                timetable_classes: JSON.stringify([]),
            })
        }) as any
        data = await data.json()
        // console.log(data);
        // let data_item = JSON.parse(data.item)
        // console.log(data_item);
        if (data.password == md5(password_input.value.trim())) {
            localStorage.setItem("name", data.name + "")
            localStorage.setItem("surname", data.surname + "")
            localStorage.setItem("id_teacher", data.id + "")
            localStorage.setItem("timetable_classes_teacher", "")
            window.location.href = "./personal_area_teacher.html"
        }
    }
    else {
        if (item_select.value == "") {
            patronymic_input.style.backgroundColor = "#ffb073"
        }
        else {
            patronymic_input.style.backgroundColor = "#FFCC73"
        }
        if (item_select.value == "") {
            item_select.style.backgroundColor = "#ffb073"
        }
        else {
            item_select.style.backgroundColor = "#FFCC73"
        }
        if (education_textarea.value == "") {
            education_textarea.style.backgroundColor = "#ffb073"
        }
        else {
            education_textarea.style.backgroundColor = "#FFCC73"
        }
        if (description_textarea.value == "") {
            description_textarea.style.backgroundColor = "#ffb073"
        }
        else {
            description_textarea.style.backgroundColor = "#FFCC73"
        }
        if (name_input.value == "") {
            // name_warning.style.display = "inline-block"
            name_input.style.backgroundColor = "#ffb073"
        }
        else {
            // name_warning.style.display = "none"
            name_input.style.backgroundColor = "#FFCC73"
        }
        if (surname_input.value == "") {
            // surname_warning.style.display = "inline-block"
            surname_input.style.backgroundColor = "#ffb073"
        }
        else {
            // surname_warning.style.display = "none"
            surname_input.style.backgroundColor = "#FFCC73"
        }
        if (password_input.value == "") {
            password_warning.style.display = "inline-block"
            password_input.style.backgroundColor = "#ffb073"
        }
        else {
            password_warning.style.display = "none"
            password_input.style.backgroundColor = "#FFCC73"
            if (password_input.value.length < 6) {
                password_min_8.style.display = "inline-block"
                password_input.style.backgroundColor = "#ffb073"
            }
            else {
                password_min_8.style.display = "none"
                password_input.style.backgroundColor = "#FFCC73"
                if (repeatPassword_input.value != password_input.value) {
                    repeatPassword_warning.style.display = "inline-block"
                    repeatPassword_input.style.backgroundColor = "#ffb073"
                }
                else {
                    repeatPassword_warning.style.display = "none"
                    repeatPassword_input.style.backgroundColor = "#FFCC73"
                }
            }
        }
        if (email_input.value == "") {
            // email_warning.style.display = "inline-block"
            email_input.style.backgroundColor = "#ffb073"
        }
        else {
            // email_warning.style.display = "none"
            email_input.style.backgroundColor = "#FFCC73"
        }
        if (phone_input.value == "") {
            // phone_warning.style.display = "inline-block"
            phone_input.style.backgroundColor = "#ffb073"
        }
        else {
            // phone_warning.style.display = "none"
            phone_input.style.backgroundColor = "#FFCC73"
        }
    }
})
console.log("ee F FeeEFFF".toLowerCase());

buttonSend_entrance?.addEventListener("click", async () => {
    if (name_input.value != "" && surname_input.value != "" && password_input.value != "") {
        let data = await fetch("http://192.168.31.58:3000/entrance", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                surname: surname_input.value.toLowerCase().trim(),
                name: name_input.value.toLowerCase().trim(),
                password: md5(password_input.value.trim()),
            })
        }) as any
        data = await data.json()

        if(data[0].name == "none" && data[0].password == "none"){
            none_warning.style.display = "inline-block"
            let s1 = name_input.value
            let s2 = surname_input.value
            name_input.value = ""
            surname_input.value = ""
            name_input.style.backgroundColor = "#ffb073"
            surname_input.style.backgroundColor = "#ffb073"
            password_input.style.backgroundColor = "#ffb073"
            name_input.value = s1
            surname_input.value = s2
        }

        if (data[0]["teacher_id"]) {
            if (data[0].password == md5(password_input.value.trim())) {
                localStorage.setItem("name", data[0].name + "")
                localStorage.setItem("surname", data[0].surname + "")
                localStorage.setItem("id_student", data[0].id + "")
                localStorage.setItem("id_teacher", data[0].teacher_id + "")
                localStorage.setItem("classes_status_user", data[0].type_class + " " + data[0].paid_lessons)
                window.location.href = "./personal_area_student.html"
                // console.log(0);

            }
        }
        else {
            if (data[0].password == md5(password_input.value.trim())) {
                localStorage.setItem("name", data[0].name + "")
                localStorage.setItem("surname", data[0].surname + "")
                localStorage.setItem("id_teacher", data[0].id + "")
                localStorage.setItem("timetable_classes_teacher", data[0].timetable_classes + "")
                window.location.href = "./personal_area_teacher.html"
            }
        }



        // console.log(data[0]);
        // console.log(data[0].class);
    }
    else {
        if (name_input.value == "") {
            name_warning.style.display = "inline-block"
            name_input.style.backgroundColor = "#ffb073"
        }
        else {
            name_warning.style.display = "none"
            name_input.style.backgroundColor = "#FFCC73"
        }
        if (surname_input.value == "") {
            surname_warning.style.display = "inline-block"
            surname_input.style.backgroundColor = "#ffb073"
        }
        else {
            surname_warning.style.display = "none"
            surname_input.style.backgroundColor = "#FFCC73"
        }
        if (password_input.value == "") {
            password_warning.style.display = "inline-block"
            password_input.style.backgroundColor = "#ffb073"
        }
        else {
            password_warning.style.display = "none"
            password_input.style.backgroundColor = "#FFCC73"
        }
    }

})




// console.log(md5("8889"));