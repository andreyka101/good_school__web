console.log("hi");


// setInterval(
//     async () => {
//         try {
//             let data = await fetch("https://api.goodschool.online/payment_information_x", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8'
//                 },
//                 body: JSON.stringify({
//                     id: +(localStorage.getItem("id_student") as string),
//                     // password: JSON.parse(localStorage.getItem("dataUser") as string).password,
//                     name: localStorage.getItem("name"),
//                     token_p: localStorage.getItem("token_p"),
//                 })
//             }) as any

//             data = await data.json()
//             console.log(data);
//             if (data.ok) {
//                 window.location.href = "./personal_area_student.html"
//             }

//         }
//         catch (e) {
//             console.log(e);

//         }
//     }
//     , 3000);


