// document.querySelector("button")?.addEventListener("click",async ()=>{
//     let data = await fetch("http://192.168.31.58:3000/payment_confirmation", {
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
// 0|app  |   type: 'ready_to_confirm',
// 0|app  |   session: {
// 0|app  |     id: 'ps_683226',
// 0|app  |     status: 'in_progress',
// 0|app  |     created_at: '2025-02-26T11:17:53.605804Z',
// 0|app  |     updated_at: '2025-02-26T11:25:09.630057Z',
// 0|app  |     acquiring_payments: [ [Object] ],
// 0|app  |     next_action: 'confirm'
// 0|app  |   }
// 0|app  | }


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






(async () => {
    console.log("llkefjefjejj");
    let data = await fetch("http://192.168.31.58:3000/get_number_money", {
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
    let data = await fetch("http://192.168.31.58:3000/first_payment", {
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