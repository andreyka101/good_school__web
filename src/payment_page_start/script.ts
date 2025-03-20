console.log("hi");



setInterval(
    async () => {
        try {
            let data = await fetch("http://192.168.31.58:3000/payment_information", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    id: +(localStorage.getItem("id_student") as string),
                    password: JSON.parse(localStorage.getItem("dataUser") as string).password,
                    name: localStorage.getItem("name"),
                    token_p: localStorage.getItem("token_p"),
                })
            }) as any

            console.log(JSON.parse(localStorage.getItem("dataUser") as string).password);
            data = await data.json()
            console.log(data);
            if (data.ok) {
                localStorage.setItem("id_teacher", data.id_t)
                localStorage.setItem("id_student", data.id_s)
                window.location.href = "./personal_area_student.html"
            }

        }
        catch (e) {
            console.log(e);

        }
    }
    , 3000);


