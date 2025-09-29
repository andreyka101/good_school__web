console.log("hi");



setInterval(
    async () => {
        try {
            console.log("hi try");
            let data = await fetch("https://api.goodschool.online/payment_information", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    password: JSON.parse(localStorage.getItem("dataUser") as string).password,
                    name: localStorage.getItem("name"),
                    surname: localStorage.getItem("surname"),
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
    , 500);


