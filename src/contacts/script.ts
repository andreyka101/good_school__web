import "./style.scss"

const phone = document.querySelector("#phone") as HTMLButtonElement
const email = document.querySelector("#email") as HTMLButtonElement

phone.addEventListener("click", ()=>{
    navigator.clipboard.writeText("+79528576944").then(function () {
        console.log('Текст успешно скопирован в буфер обмена');
        phone.classList.add("button_active_1")
        phone.innerHTML = `<div class="svg"></div>
                <div class="information_text">
                    номер скопирован
                </div>`
        setTimeout(() => {
            phone.classList.remove("button_active_1")
            phone.innerHTML = `<div class="svg"></div>
                <div class="information_text">
                    +79528576944
                </div>`
        }, 5000)
    }, function (err) {
        console.error('Произошла ошибка при копировании текста: ', err);
    });
})

email.addEventListener("click", ()=>{
    navigator.clipboard.writeText("goodschool80@mail.ru").then(function () {
        console.log('Текст успешно скопирован в буфер обмена');
        email.classList.add("button_active_2")
        email.innerHTML = `<div class="svg"></div>
                <div class="information_text">
                    почта скопирована
                </div>`
        setTimeout(() => {
            email.classList.remove("button_active_2")
            email.innerHTML = `<div class="svg"></div>
                <div class="information_text">
                    goodschool80@mail.ru
                </div>`
        }, 5000)
    }, function (err) {
        console.error('Произошла ошибка при копировании текста: ', err);
    });
})


