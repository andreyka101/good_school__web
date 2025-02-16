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
// https://developer.131.ru/widget/payment-widget/







import forge from 'node-forge'
document.querySelector("button")?.addEventListener("click", async () => {

    // Ваши данные, которые нужно подписать
    // const message = {
    //     "amount_details": {
    //       "amount": 10000,
    //       "currency": "rub"
    //     },
    //     "metadata": "order123"
    //   }
    const message = {
        "tokenize_widget": {
            "access": true
        },
        "self_employed_widget": {
            "tax_reference": "111111111111"
        }
    }



    // Приватный ключ в PKCS8 PEM формате
    const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAyW28Bq5ndkcNHEGEXH4OxjOhWiPT4PKrTglTnsj3pAb6SVtU
LpjMw2dCZooa6anZU6X077Vnalw8gx5jfUpZEbYNXNfsA8izv6xKUbAEbN5PIkK9
LrnwCi7bplWPJ4++BL75gS5Z/vgljPgLKqAJ1QrUadBY/s1r8zJBuaSZUIOVePaz
y4re7S3mlXsyl0FMEAqOjhuQepUmWQfG/oyx7f/HTknkxenXJDnQoSMHdYHCyUYR
HenOhEjBueZVEAsrucb2TxrtnKuz+BrbEqu74otqurA0XgIBHQYqM7psrqUNsOJT
Sg+n30IldvWw/MImYzjk3tGajw0cOEkCIHJSMQIDAQABAoIBAQC1ZUAd2DPOPUAe
QRY84TzW2yokbf1iJ8eDWDzY0uzI54vAQiH2cJ5+HmCazSZdZRsVDHAe6wN9siDA
h75a13iMzaENClo+MiFFrJelJtllXXJwTR/nk4UK9pXSHlzz6KvbxEwXPLHJPpk6
cSpFMaiJFd6iiAGNPVtIwOqVjxiOesd3oWBqp72NDuszM4pf8B5rDuaP7pY8bqwM
tXZUjjOKPF1yjloFFFOr/P0zSvpdokizlIvVLGM0le/QkbVLBa1AojKmvhHiFtln
JPxHpJk9fioUzSL29u6PGhqb+MFgDlzMmDDgZa0gjueOeJPmumC6mP7XoPgQgpv+
gOm81+gBAoGBAPGngIFrsOf1qylDpehtNVvjvRbeP8Q0n6Lmdua/tEzTpwF9/lME
69q3oS91ESw7eUzS6YCkI8aUvH/+AaMmqBaIrIpGbtBcq7SJe9ZfKNqP/5KwbCiJ
qXEcwvAKp47fz42+eh/oG7nuEFS/1/XeQjplhHnLyehYw5IkD/Tplf+xAoGBANVi
6Qr3oa3mrKt7pO+mVojQ+BECIh4/ze0zV+frKYrF4ITS7dGP7ro8UOXpucC2dDJA
0uepkYb3ZfZ7usBIg8hb2j3pnumKe1otxKqxjjb8K49dLqHvf+tjtSNGZyKz4ISU
YrP0bkTQd6VF0nfFv0QWZ3eyxoeSTmUxEXYfzJqBAoGAKYL2pkTTnOUsw+flBipM
cj6K6vS+y3umuJsSbc0csd3h4HW+TJCZ23aT780SaCDHU5Ufm4OWybQfNXVy3o3z
bfuIeDBlNNHWhSrg5RBvuivmYVKBIe2T9+RS8F1EL1zvEJBZ9kUvDh+BGq3h8VB+
2/04ZpvFUW5+Ggqr2wyNQeECgYACgPudDlTOVpOWG4hO65O+XT1b7bt6wWLoMp8I
cKD3KOU+ib8So264rraATCLK2Rk58brHzxyPCd4fa0pAsVkig7lm2pPrx5007K6P
FjBGAuV79Cr06XuFxpC8jjntlVDAHYGe/PJCSnPs84nJr/9TjDPAms9rjdLvqwi6
axsagQKBgFd+W9WsTsuH39HcgoQ0fAvfbR/PcziGDhoeq6tjoH4PsyNjOJ0S39s1
w6ZDXC739OAccTYuVVOKvwL0DaPzS2FAzMr6Sqz8Tq685kl/jywczoS2Bw4/PpUP
BbuRL9SD/2iwpPi34UT9MNOOGGtiA3vqmnSjALYqs3HB+BbrI7CR
-----END RSA PRIVATE KEY-----
`;


    // Импортируем приватный ключ
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // Создаем подпись
    const md = forge.md.sha256.create();
    md.update(JSON.stringify(message), 'utf8');

    // Подписываем сообщение
    const signature = privateKey.sign(md);

    // Преобразуем подпись в base64 для удобства
    const signatureBase64 = forge.util.encode64(signature);

    console.log('Подпись:', signatureBase64);

    let data = await fetch("https://demo.bank131.ru/api/v1/token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "X-PARTNER-PROJECT": "vyglendalova_acq",
            "X-PARTNER-SIGN": signatureBase64,
        }
    })
    console.log(data);
    data = await data.json()
    console.log(data);
})