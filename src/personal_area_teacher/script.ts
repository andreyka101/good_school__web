import "./style.scss"

let userNameSurname_div = document.querySelector(".blockTop_name .user_name_surname") as HTMLDivElement
let timetable_classes_div = document.querySelector(".flex_center .timetable_classes") as HTMLDivElement


userNameSurname_div.innerText = localStorage.getItem("name") + " " + localStorage.getItem("surname")



