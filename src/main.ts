const id_header_oge = document.querySelector("#id_header_oge") as HTMLElement
id_header_oge?.addEventListener("mouseover",()=>{
    
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","oge")
})
const id_header_prog = document.querySelector("#id_header_prog") as HTMLElement
id_header_prog?.addEventListener("mouseover",()=>{
    
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","prog")
})
const id_header_none = document.querySelector("#id_header_none") as HTMLElement
id_header_none?.addEventListener("mouseover",()=>{
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","none")
})
