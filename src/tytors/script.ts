import "./style.scss"

async function start() {
  const tutors_box = document.querySelector(".tutors_box") as HTMLDivElement
  let data = await fetch("https://api.goodschool.online/get_all_teacher", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }) as any
  data = await data.json()
  console.log(data);
  let str_html = ''
  for (let i in data) {

    let string_surname = (data[i].surname + "").split("")
    string_surname[0] = string_surname[0].toUpperCase()
    let string_name = (data[i].name + "").split("")
    string_name[0] = string_name[0].toUpperCase()
    let string_patronymic = (data[i].patronymic + "").split("")
    string_patronymic[0] = string_patronymic[0].toUpperCase()

    str_html += `<div class="card_teacher">
        <div class="img_text">
          <div class="photo" style="${(data[i].item == 'mathematics') ? "background: url('p11.jpeg') center / cover;" : "background: url('p10.jpeg') center / cover;"}"></div>
          <span>
            <p class="name">

              ${string_surname.join("")}
              </p>
              <p class="name">
              
              ${string_name.join("")}
              </p>
              <p class="name">
              
              ${string_patronymic.join("")}
            </p>
            <p>
            ${(data[i].item == 'mathematics') ? "учитель" : "репетитор"} по
            ${(data[i].item == 'mathematics') ? 'математике, информатике.' : 'программированию.'}
            </p>
            </span>
            </div>
            <p>
            ${data[i].education}
            </p>
            <p class="teacher_text">
            ${data[i].description
      }
        </p>
      </div>`
  }
  tutors_box.innerHTML = str_html
}
start()
console.log(window.innerHeight);
