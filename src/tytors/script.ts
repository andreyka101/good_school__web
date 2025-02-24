import "./style.scss"
import NodeRSA from 'encrypt-rsa'
let privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAuhY1n34gKuGUfRVTSO7Ucn057fBYaWcI+sZmlTslQUQDRDgE
uaM5ONDgLTRqfP5U3aqo2OkUVISnO2C/2HXtcUPkO/FcplM8UX8RoiaG/JVXjtUY
GIaLL4WBO/XzMjs+hEq6J5b5mUysf4O+iMe74m2PzoPP/PClanOQq0d+4TG7Jrbd
U2Sc0MmWXw2XvtrEMEZQh3N+EHVtJ/8gTTE0bGG0z5BYncG7bHw90m7oXfIrFBg6
6kXeDDXxRAMCb4obEwPxnwzD9E09YLW0DAPELl4F7c8h3iklQBFrQCclkgIMFrZm
djc9078u++UyLEk6lqfw94ZDlSFiEYqFn+SoKwIDAQABAoIBAQCM9zIb5kGb+lKw
Bq2WvEV3jWGK2909y23D+vPO7IUmUc1fqkf6EKnSXnjUBbb9hPTpDtTlrHtYIz1D
/+CUq5D5koKc3hRfcwJogifre+AaC0/OxaKBQbrCfxINSB242aRcNveZ8gaWmLy7
xCNcHmI3/uNHgBbY97t3TqAy//Afym/aCtfAdBOgv/AaWPfygrEkMEKoLyzRbkh7
/l51RWFT5w385IGvBNDmUwDLhH9bEx5aegs0PqnHu5tf569EJ18X8Rrp8aEwcgzt
rMg4SGemSi1S39YfPb5XPAvy111dPmoaLywZCnsupR9ga9B4tm//JjlLTMKgvye9
cr5dGNvBAoGBANs5Lt+Ny6YpkX347FDg8iF92NM8wTd/yCg/JDE/fQfe+ZX3wJTQ
PprPA2R7ltUhkubhIECyRF+iEoyPK7vvCUvoJRygE319zDWzMAXRaxGuarGiR6Kz
GpISHu5sD9yiaZvaWz4Qv30r0lkz4rFb94kQ7GcwBjAsTpz81BgGr6U7AoGBANlN
7weako8GFJqUJCHLUkYHrZyEbfUBtk3HAOTIm4CQ3rM6GjYn7IGXxPv1FI51PFQv
tSvdOJX3rWA2YzeMhlyNWTEIxK7u8X8lLOAwoYFDCvARVlb7rfxA9mE8kLrcVPa2
44Z9wH/afQAo6kCvSCZ2vH656E9SAHGVZ/+kVBnRAoGBALIo5dQeu4udqrUS8JLG
TWE0klsRvAErovI6ZmJzs1wLNRFQ2LzYBJjxdlNaMXmioG1sNjb96Z1C7Qo4bJV+
LTL4RfjeixhofOaDapq/1+D1u5YDSW6LWiOuAF9JiRaJE4Tqz05AdC74xylhhnEX
SbOmAknV+KF70KO6wW+JN4PzAoGBALjaaQno3d+45nIQryPoWBamlXNd3EPdrv0+
2m3EkTOvCSMhvAZxs+kR+En1VAVTiXx8EPw9ddNtHBmKaqBodCvrOgJSWS4OqXTl
ZOVZuSnCpF1QAkiAVKMPiAdzhBLRN52gOrC/7K9WZ5tpMszPzuqZewO6lfpT4Xi+
BfgcDEbhAoGAVdO3VnHIKFzNYP2yCOBw3HwUzuJCZbnAu5X4owEjdJZGNsxchVj8
F0j/ZVGxOZDE/BfCb8U+k/scVpt0IkfqSIBw5DUDAsQA1Nx9/koDmk+wgT2kquSC
YDnUm0rHjsU01NAIDTDYiQsS5ycqvyWBu9JPMNMTX0KXQhGiqDHfhjs=
-----END RSA PRIVATE KEY-----`

let publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuhY1n34gKuGUfRVTSO7U
cn057fBYaWcI+sZmlTslQUQDRDgEuaM5ONDgLTRqfP5U3aqo2OkUVISnO2C/2HXt
cUPkO/FcplM8UX8RoiaG/JVXjtUYGIaLL4WBO/XzMjs+hEq6J5b5mUysf4O+iMe7
4m2PzoPP/PClanOQq0d+4TG7JrbdU2Sc0MmWXw2XvtrEMEZQh3N+EHVtJ/8gTTE0
bGG0z5BYncG7bHw90m7oXfIrFBg66kXeDDXxRAMCb4obEwPxnwzD9E09YLW0DAPE
Ll4F7c8h3iklQBFrQCclkgIMFrZmdjc9078u++UyLEk6lqfw94ZDlSFiEYqFn+So
KwIDAQAB
-----END PUBLIC KEY-----`


const  text  =  "Hello, World!" ; 
const  nodeRSA  =  new NodeRSA ( publicKey ,  privateKey ,  2048 ) ;
const encryptedString = nodeRSA.encrypt({ text, privateKey });
console.log('Encrypted with Private Key:', encryptedString);
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
