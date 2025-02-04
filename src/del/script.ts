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


document.querySelector("button")?.addEventListener("click",async ()=>{
    //LINK - получаем хеш строки с помощью алгоритма SHA-256
    async function getSHA256Hash(str:string) {
        const buf = new TextEncoder().encode(str);
        const digest = await crypto.subtle.digest('SHA-256', buf);
        return Array.from(new Uint8Array(digest))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      }
      console.log(await getSHA256Hash('1') )
      console.log(await getSHA256Hash('2'))
    


    //LINK - кодирование строки в Base64
    let encodedString = btoa("hello i str"); 
    console.log(encodedString); 

    //LINK - декодирование строки из Base64
    let decodedString = atob(encodedString); 
    console.log(decodedString)


    // let data = await fetch("https://demo.bank131.ru/api/v1/session/create", {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "X-PARTNER-PROJECT": "vyglendalova_acq",
    //         "X-PARTNER-SIGN": ,
    //     },
    //     body: ""
    // }) as any
    // console.log(data);
    // data = await data.json()
    // console.log(data);
})
