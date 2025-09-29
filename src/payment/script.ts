import "./style.scss"

const prices_cards_block = document.querySelector(".prices_cards_block div") as HTMLDivElement

async function start_page() {
    let data = await fetch("https://api.goodschool.online/get_student_start_page", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_student") + "")
        })
    }) as any
    data = await data.json()
    console.log(data);
    if (data.name != localStorage.getItem("name") || data.surname != localStorage.getItem("surname")) {
        localStorage.setItem("name", "")
        localStorage.setItem("surname", "")
        localStorage.setItem("id_teacher", "")
        localStorage.setItem("id_student", "")
        window.location.href = "./"
    }
}
start_page()

// let class_status = "_individual"


async function name() {
    let data = await fetch("https://api.goodschool.online/get_prices") as any
    data = await data.json()
    let dataUserClass = await fetch("https://api.goodschool.online/get_student_for_s", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: +(localStorage.getItem("id_student") + ""),
            name: localStorage.getItem("name"),
            surname: localStorage.getItem("surname"),
        })
    }) as any
    dataUserClass = await dataUserClass.json()

    //console.log("dataUserClass");
    //console.log((""+localStorage.getItem("classes_status_user")).split(" "));
    
    let html_str = ""
    for (let i = 0; i != 3; i++) {
        let span_for_free = ""
        let num_classes = ""
        let num_lesson = ""
        if (i == 0) {
            num_classes = "1 занятие"
            num_lesson = "ое"
            span_for_free = ``
        }
        if (i == 1) {
            num_classes = "10 занятий"
            num_lesson = "ых"
            span_for_free = `<span class="span_red">
            30 минут урока бесплатно
            </span>`
        }
        if (i == 2) {
            num_classes = "30 занятий"
            num_lesson = "ых"
            span_for_free = `<span class="span_red">
                        60 минут урока бесплатно
                    </span>`
        }

        html_str += `
        <div class="item_card">
            <div class="item_card_flex">
                <h3>
                    ${num_classes}
                    <div>
                        ${ (((localStorage.getItem("classes_status_user")+"").split(" ")[0] == "9-11_group" || (localStorage.getItem("classes_status_user")+"").split(" ")[0] == "programming_group") ? "Группов" : "Индивидуальн") + num_lesson}
                    </div>
                </h3>
                <span class="span_big">
                    ${data[dataUserClass.type_class][i]} руб
                </span>
                <span>
                    <span class="span_big">
                        50
                    </span>
                    минут урок
                </span>
                ${span_for_free}
            </div>
            <button data-num="${dataUserClass.type_class} ${num_classes}" class="igs_button_universal_B1">
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
    localStorage.setItem("pay", target.dataset.num+"")
    window.location.href = "./check_amount.html"
})
