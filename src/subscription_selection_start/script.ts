import "./style.scss"

const button_x_1 = document.querySelector("#button_x_1") as HTMLElement
const button_x_2 = document.querySelector("#button_x_2") as HTMLElement
const span_x_1 = document.querySelector("#span_x_1") as HTMLElement
const span_x_2 = document.querySelector("#span_x_2") as HTMLElement
const prices_cards_block = document.querySelector(".prices_cards_block div") as HTMLDivElement

let class_status = "_individual"

button_x_2?.addEventListener("click", () => {
    class_status = "_individual"
    button_x_1.classList.remove("sleep_none")
    span_x_1.classList.remove("sleep_none")
    button_x_2.classList.add("sleep_none")
    span_x_2.classList.add("sleep_none")
    name()
})
button_x_1?.addEventListener("click", () => {
    class_status = "_group"
    console.log("9");
    button_x_2.classList.remove("sleep_none")
    span_x_2.classList.remove("sleep_none")
    button_x_1.classList.add("sleep_none")
    span_x_1.classList.add("sleep_none")
    name()
})
async function name() {
    let data = await fetch("https://api.goodschool.online/get_prices") as any
    data = await data.json()
    let dataUserClass = JSON.parse(localStorage.getItem("dataUser")+"").class
    if(dataUserClass == "1-4" || dataUserClass == "5-8") dataUserClass = "1-8"
    if(JSON.parse(localStorage.getItem("dataUser")+"").item == "programming") dataUserClass = "programming"
    if(dataUserClass == "1-8"){
        const options_center = document.querySelector(".options_center") as HTMLElement
        options_center.style.display = "none"
        const h1 = document.querySelector("h1") as HTMLElement
        h1.style.marginBottom = "100px"
    }
    console.log(dataUserClass);
    console.log(data[dataUserClass + class_status][0]);
    let html_str = ""
    for (let i = 0; i != 3; i++) {
        let span_for_free = ""
        let num_classes = ""
        if (i == 0) {
            num_classes = "1"
            span_for_free = ``
        }
        if (i == 1) {
            num_classes = "10"
            span_for_free = `<span class="span_red">
            30 минут урока бесплатно
            </span>`
        }
        if (i == 2) {
            num_classes = "30"
            span_for_free = `<span class="span_red">
                        60 минут урока бесплатно
                    </span>`
        }

        html_str += `
        <div class="item_card">
            <div class="item_card_flex">
                <h3>
                    ${num_classes} занятие
                </h3>
                <span class="span_big">
                    ${data[dataUserClass + class_status][i]} руб
                </span>
                <span>
                    <span class="span_big">
                        50
                    </span>
                    минут урок
                </span>
                ${span_for_free}
            </div>
            <button data-num="${dataUserClass + class_status} ${num_classes}" class="igs_button_universal_B1">
                продолжить
            </button>
        </div>`
    }
    prices_cards_block.innerHTML = html_str
}
name()
prices_cards_block.addEventListener('click',(e)=>{
    let target = e.target as HTMLElement
    if(target.className != "igs_button_universal_B1") return
    console.log(target.dataset.num);
    localStorage.setItem("classes_status_user", target.dataset.num+"")
    window.location.href = "./setting-up-timetable-student-start.html"
})
