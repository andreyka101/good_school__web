import "./style.scss"
async function start() {
    const tutors_box = document.querySelector(".tutors_box") as HTMLDivElement
    let data = await fetch("http://localhost:3000/get_all_teacher", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }) as any
    data = await data.json()
    console.log(data);
    let str_html = ''
    for (let i in data) {
        str_html += `<div class="card_teacher">
        <div class="img_text">
          <div class="photo" style="${(data[i].item == 'mathematics') ? "background: url('p11.png') center / cover;" : "background: url('p10.jpeg') center / cover;"}"></div>
          <span>
            <p class="name">

              ${data[i].surname}
              </p>
              <p class="name">
              
              ${data[i].name}
              </p>
              <p class="name">
              
              ${data[i].patronymic}
            </p>
            <p>
            учитель по
            ${(data[i].item == 'mathematics') ? 'математике, информатике.' : 'программированию.'}
            </p>
            <p>
            ${data[i].education
            }
            </p>
            </span>
            </div>
            <p class="teacher_text">
            ${data[i].description
            }
        </p>
      </div>`
    }
    tutors_box.innerHTML = str_html
}
start()