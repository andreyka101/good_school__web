import "./style.scss"

const body = document.querySelector("body") as HTMLBodyElement
body.addEventListener('mousemove',(event)=>{
    let target = event.target as HTMLElement
    if(target.tagName != "svg" && target.tagName != "path" && target.tagName != "a" && target.tagName != "SPAN") return
    if(target.tagName == "svg" || target.tagName == "path") target = target.closest("a") as HTMLElement;
    if(target.className == "id_prices_oge"){
        localStorage.setItem("dataUser","")
        localStorage.setItem("registration_configuration","oge")
    }
    if(target.className == "id_prices_prog"){
        localStorage.setItem("dataUser","")
        localStorage.setItem("registration_configuration","prog")
    }
    if(target.className == "id_prices_none"){
        localStorage.setItem("dataUser","")
        localStorage.setItem("registration_configuration","none")
    }
    console.log(target);
    
})

