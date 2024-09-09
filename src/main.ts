const rq0 = document.querySelector("#rq0") as HTMLElement
rq0?.addEventListener("mouseover",()=>{
    
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","oge")
})
const rq1 = document.querySelector("#rq1") as HTMLElement
rq1?.addEventListener("mouseover",()=>{
    
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","prog")
})
const rq2 = document.querySelector("#rq2") as HTMLElement
rq2?.addEventListener("mouseover",()=>{
    localStorage.setItem("dataUser","")
    localStorage.setItem("registration_configuration","none")
})
