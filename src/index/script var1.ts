import "./style.scss"
const id_index_prog = document.querySelector("#id_index_prog") as HTMLElement
id_index_prog?.addEventListener("mouseover",()=>{
    
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","prog")
})
const id_index_none = document.querySelector("#id_index_none") as HTMLElement
id_index_none?.addEventListener("mouseover",()=>{
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","none")
})
const id_index_none2 = document.querySelector("#id_index_none2") as HTMLElement
id_index_none2?.addEventListener("mouseover",()=>{
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","none")
})