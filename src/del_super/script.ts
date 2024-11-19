import { sha256 } from 'js-sha256';

const button = document.querySelector("button")


button?.addEventListener("click", async () => {
    console.log("clii");
    console.log(sha256(JSON.stringify({
        "order_id": "001",
        "amount": "200",
        "info": [{
            "name": "Cвитер ручной работы",
            "quantity": "2",
            "amount": "100"
        }],
        "api_key": "92Gn36QV8WVm8DTij4pS1v20m331r0rd92Gn36QV8WVm8DTij4pS1v20m331r0rd92Gn36QV8WVm8DTij4pS1v20m331r0rd92Gn36QV8WVm8DTij4pS1v20m331r0rd92Gn36QV8WVm8DTij4pS1v20m331r0rd"
    })));
    
    let data = await fetch("https://pro.selfwork.ru/merchant/v1/init", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://goodschool.online/",
            "Referer": "goodschool.online"
        },
        body: sha256(JSON.stringify({
            "order_id": "001",
            "amount": "200",
            "info": [{
                "name": "Cвитер ручной работы",
                "quantity": "2",
                "amount": "100"
            }],
            "api_key": "92Gn36QV8WVm8DTij4pS1v20m331r0rd92Gn36QV8WVm8DTij4pS1v20m331r0rd92Gn36QV8WVm8DTij4pS1v20m331r0rd92Gn36QV8WVm8DTij4pS1v20m331r0rd92Gn36QV8WVm8DTij4pS1v20m331r0rd"
        }))
    }) as any
    // data = await data.json()
    console.log(data);
})





