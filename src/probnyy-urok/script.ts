import "./style.scss"

// const phone = document.querySelector("#phone") as HTMLLinkElement
// const email = document.querySelector("#email") as HTMLLinkElement
// // @ts-ignore
// let detect = new MobileDetect(window.navigator.userAgent)

// if(detect.mobile() != null){
//     phone.href = "tel:+79189700187"
//     email.href = "mailto:goodschool80@mail.ru"
// }
// phone.addEventListener("click", () => {
//     if (detect.mobile() == null) {

//         navigator.clipboard.writeText("+79189700187").then(function () {
//             console.log('Текст успешно скопирован в буфер обмена');
//             phone.classList.add("button_active_1")
//             phone.innerHTML = `<div class="svg"></div>
//                 <div class="information_text">
//                     номер скопирован
//                 </div>`
//             setTimeout(() => {
//                 phone.classList.remove("button_active_1")
//                 phone.innerHTML = `<div class="svg"></div>
//             <div class="information_text">
//             +79189700187
//             </div>`
//             }, 3000)
//         }, function (err) {
//             console.error('Произошла ошибка при копировании текста: ', err);
//         });
//     }
// })

// email.addEventListener("click", () => {
//     if (detect.mobile() == null) {

//         navigator.clipboard.writeText("goodschool80@mail.ru").then(function () {
//             console.log('Текст успешно скопирован в буфер обмена');
//             email.classList.add("button_active_2")
//             email.innerHTML = `<div class="svg"></div>
//             <div class="information_text">
//             почта скопирована
//             </div>`
//             setTimeout(() => {
//                 email.classList.remove("button_active_2")
//                 email.innerHTML = `<div class="svg"></div>
//                 <div class="information_text">
//                     goodschool80@mail.ru
//                 </div>`
//             }, 3000)
//         }, function (err) {
//             console.error('Произошла ошибка при копировании текста: ', err);
//         });
//     }
// })
// //@ts-ignore
// console.log("Mobile: " + detect.mobile());





const name = document.querySelector("#inp_name") as HTMLInputElement
const phone = document.querySelector("#inp_phone") as HTMLInputElement
const button = document.querySelector("button") as HTMLButtonElement

button.addEventListener("click", async () => {
    // alert("ok")
    console.log({
        name: name.value,
        phone: phone.value
    });
    let data = await fetch("https://api.goodschool.online/api/omega", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: name.value,
            phone: phone.value
        })
    }) as any
    data = await data.json()
    // alert(data)
    console.log(data);

})


