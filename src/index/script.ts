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
// #00A287	#1E796A	#006957	#34D0B6	#5ED0BD
// #104BA9	#284A7E	#052D6E	#447BD4	#6A93D4
// #FFA200	#BF8B30	#A66A00	#FFBA40	#FFCC73
// #FF6700	#BF6A30	#A64300	#FF8D40	#FFAB73