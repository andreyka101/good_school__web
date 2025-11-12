const id_header_oge = document.querySelector("#id_header_oge") as HTMLElement
id_header_oge?.addEventListener("mouseover", () => {

    localStorage.setItem("dataUser", "")
    localStorage.setItem("registration_configuration", "oge")
})
const id_header_prog = document.querySelector("#id_header_prog") as HTMLElement
id_header_prog?.addEventListener("mouseover", () => {

    localStorage.setItem("dataUser", "")
    localStorage.setItem("registration_configuration", "prog")
})
const id_header_none = document.querySelector("#id_header_none") as HTMLElement
id_header_none?.addEventListener("mouseover", () => {
    localStorage.setItem("dataUser", "")
    localStorage.setItem("registration_configuration", "none")
})

const menu_on = document.querySelector("#menu_on") as HTMLButtonElement
console.log(menu_on);

menu_on?.addEventListener("click", () => {
    const arr_invisible_link_header = [...document.querySelectorAll(".invisible_link_header")] as Array<HTMLElement>
    console.log(arr_invisible_link_header);
    for (let invisible_link of arr_invisible_link_header) {
        // console.log(invisible_link);

    }

})



const leftButton = document.querySelector('.scroll-button_left') as HTMLButtonElement
const rightButton = document.querySelector('.scroll-button_right') as HTMLButtonElement
const scrollableContent = document.querySelector('.block_a_global') as HTMLDivElement

function updateButtonVisibility() {
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollableContent;
    console.log(scrollLeft , clientWidth , scrollWidth);

    // Показываем или скрываем кнопку "влево"
    if (scrollLeft <= 50) {
        leftButton.style.display = "none"
    } else {
        leftButton.style.display = "inline-block"
    }

    // Показываем или скрываем кнопку "вправо"
    if (scrollLeft + clientWidth >= scrollWidth - 50) {
    // if (scrollLeft >= clientWidth) {
        rightButton.style.display = "none"
    } else {
        rightButton.style.display = "inline-block"
    }
}

leftButton.addEventListener('click', () => {
    scrollableContent.scrollBy({ left: -1000, behavior: 'smooth' });
    updateButtonVisibility(); // Обновляем видимость кнопок
});

rightButton.addEventListener('click', () => {
    scrollableContent.scrollBy({ left: 1000, behavior: 'smooth' });
    updateButtonVisibility(); // Обновляем видимость кнопок
});

// Проверяем видимость кнопок при загрузке страницы
updateButtonVisibility();

// Используем событие scroll для обновления состояния кнопок
scrollableContent.addEventListener('scroll', updateButtonVisibility);
