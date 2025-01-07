document.querySelector("button")?.addEventListener("click",async ()=>{
    let data = await fetch("http://192.168.31.58:3000/purchase_of_additional_classes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id:+(localStorage.getItem("id_student") as string),
            pay:localStorage.getItem("pay"),
            ok:true
        })
    }) as any
    data = await data.json()
    console.log(data);
    if(data.ok){
        window.location.href = "./personal_area_student.html"
    }
})