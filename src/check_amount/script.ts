// document.querySelector("button")?.addEventListener("click",async ()=>{
// let data = await fetch("https://api.goodschool.online/purchase_of_additional_classes", {
// method: "POST",
// headers: {
// 'Content-Type': 'application/json;charset=utf-8'
// },
// body: JSON.stringify({
// id:+(localStorage.getItem("id_student") as string),
// pay:localStorage.getItem("pay"),
// password: JSON.parse(localStorage.getItem("dataUser") as string).password,
// name: localStorage.getItem("name")
// })
// }) as any
// data = await data.json()
// console.log(data);
// if(data.ok){
// window.location.href = "./personal_area_student.html"
// }
// })


import "./style.scss"






(async () => {
    console.log("llkefjefjejj");
    let data = await fetch("https://api.goodschool.online/get_number_money", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            pay: localStorage.getItem("pay"),
            ok: true
        })
    }) as any
    data = await data.json()
    console.log(data);
    const pay_num = (localStorage.getItem("pay")as string).split(" ")[1]
    const div_info = document.querySelector(".text_info") as HTMLDivElement
    div_info.innerHTML = /*html*/ `
    <h1>
        Покупка ${pay_num} ${(pay_num == "1") ? "занятия" : "занятий"}
    </h1>
    <h2>
        сумма ${data.money} руб.
    </h2>
    `
    // const but = document.querySelector("button") as HTMLButtonElement
    // but.innerText = `перейти к оплате ${(pay_num == "1") ? "занятия" : "занятий"}`
})()



document.querySelector("button")?.addEventListener("click", async () => {
    let data = await fetch("https://api.goodschool.online/purchase_of_additional_classes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_student") as string),
            // password: JSON.parse(localStorage.getItem("dataUser") as string).password,
            pay: localStorage.getItem("pay"),
            name: localStorage.getItem("name")
        })
    }) as any
    data = await data.json()
    console.log(data);
    if (data.ok) {
        localStorage.setItem("buying_new_lesson", localStorage.getItem("pay")+"")
        localStorage.setItem("token_p", data.answer)
        window.location.href = "./payment_page.html"
    }
    // else{
    // window.location.href = "./"
    // }
})