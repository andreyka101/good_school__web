// document.querySelector("button")?.addEventListener("click",async ()=>{
//     let data = await fetch("https://api.goodschool.online/purchase_of_additional_classes", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//             id:+(localStorage.getItem("id_student") as string),
//             pay:localStorage.getItem("pay"),
//             password: JSON.parse(localStorage.getItem("dataUser") as string).password,
//             name: localStorage.getItem("name")
//         })
//     }) as any
//     data = await data.json()
//     console.log(data);
//     if(data.ok){
//         window.location.href = "./personal_area_student.html"
//     }
// })








(async () => {
    console.log("llkefjefjejj");
    let data = await fetch("https://api.goodschool.online/get_number_money", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            pay: localStorage.getItem("classes_status_user"),
            ok: true
        })
    }) as any
    data = await data.json()
    console.log(data);
})()



document.querySelector("button")?.addEventListener("click", async () => {
    let data = await fetch("https://api.goodschool.online/purchase_of_additional_classes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id:+(localStorage.getItem("id_student") as string),
            // password: JSON.parse(localStorage.getItem("dataUser") as string).password,
            pay:localStorage.getItem("pay"),
            name: localStorage.getItem("name")
        })
    }) as any
    data = await data.json()
    console.log(data);
    if(data.ok){
        localStorage.setItem("token_p", data.answer)
        window.location.href = "./payment_page.html"
    }
    // else{
    //     window.location.href = "./"
    // }
})