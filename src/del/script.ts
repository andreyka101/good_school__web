// document.querySelector("button")?.addEventListener("click",async ()=>{
//     let data = await fetch("https://api.goodschool.online/payment_confirmation", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//             id:+(localStorage.getItem("id_student") as string),
//             ok:true
//         })
//     }) as any
//     data = await data.json()
//     console.log(data);
//     if(data.ok){
//         localStorage.setItem("id_teacher",data.id_t)
//         localStorage.setItem("id_student",data.id_s)
//         window.location.href = "./personal_area_student.html"
//     }
// })


document.querySelector("button")?.addEventListener("click",async ()=>{
    let data = await fetch("https://demo.bank131.ru/api/v1/session/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "X-PARTNER-PROJECT": "vyglendalova_acq",
        },
        body: ""
    }) as any
    console.log(data);
    data = await data.json()
    console.log(data);
})
