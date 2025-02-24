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
// https://developer.131.ru/widget/payment-widget/





document.querySelector("button")?.addEventListener("click", async () => {
    let data = await fetch("https://api.goodschool.online/first_payment", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_student") as string),
            ok: true
        })
    }) as any
    data = await data.json()
    console.log(data);
    localStorage.setItem("token_p", data.public_token)
    window.location.href = "./del_x.html"
})