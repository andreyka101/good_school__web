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

// https://developer.131.ru/payments/payment-with-form/




// 0|app  | hooks_pay
// 0|app  | {
//     0|app  |   type: 'payment_finished',
//     0|app  |   session: {
//     0|app  |     id: 'ps_687146',
//     0|app  |     status: 'accepted',
//     0|app  |     created_at: '2025-03-04T13:33:11.719843Z',
//     0|app  |     updated_at: '2025-03-04T13:34:14.041302Z',
//     0|app  |     acquiring_payments: [ [Object] ],
//     0|app  |     actions: {
//     0|app  |       confirm: '2025-03-04T13:33:53.469641Z',
//     0|app  |       capture: '2025-03-04T13:33:53.734278Z'
//     0|app  |     }
//     0|app  |   }
//     0|app  | }



// [
//     0|app  |   {
//     0|app  |     id: 'pm_436186',
//     0|app  |     status: 'pending',
//     0|app  |     created_at: '2025-02-26T17:18:32.164048Z',
//     0|app  |     customer: { reference: '1' },
//     0|app  |     payment_details: { type: 'card', card: [Object] },
//     0|app  |     amount_details: { amount: 10000, currency: 'RUB' },
//     0|app  |     amounts: { fee: [Object] },
//     0|app  |     metadata: 'hello'
//     0|app  |   }
//     0|app  | ]
import "./style.scss"






(async () => {
    console.log(+(localStorage.getItem("classes_status_user")?.split(" ")[1] as string));
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
    const pay_num = (localStorage.getItem("classes_status_user")as string).split(" ")[1]
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
    
    let data = await fetch("https://api.goodschool.online/first_payment", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_student") as string),
            dataUser: JSON.parse(localStorage.getItem("dataUser") as string),
            ok: true
        })
    }) as any
    data = await data.json()
    console.log(data);
    if(data.ok){
        localStorage.setItem("token_p", data.answer)
        window.location.href = "./payment_page_start.html"
    }
    else{
        window.location.href = "./"
    }
})