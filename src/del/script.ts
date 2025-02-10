import forge from 'node-forge'
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






// const NodeRSA = require('node-rsa');
// import NodeRSA from 'encrypt-rsa'
// import NodeRSA from 'node-rsa'

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


// const  text  =  "Hello,World!" ; 
// const  nodeRSA  =  new NodeRSA () ;
// const encryptedString = nodeRSA.encrypt({ text});
// console.log('Encrypted with Private Key:', encryptedString);

// const { public_Key, private_Key } = nodeRSA.createPrivateAndPublicKeys(2048) as any
// console.log('Public Key:', public_Key);
// console.log('Private Key:', private_Key);





// const key = new NodeRSA(`-----BEGIN RSA PRIVATE KEY-----
// MIIEpQIBAAKCAQEAuhY1n34gKuGUfRVTSO7Ucn057fBYaWcI+sZmlTslQUQDRDgE
// uaM5ONDgLTRqfP5U3aqo2OkUVISnO2C/2HXtcUPkO/FcplM8UX8RoiaG/JVXjtUY
// GIaLL4WBO/XzMjs+hEq6J5b5mUysf4O+iMe74m2PzoPP/PClanOQq0d+4TG7Jrbd
// U2Sc0MmWXw2XvtrEMEZQh3N+EHVtJ/8gTTE0bGG0z5BYncG7bHw90m7oXfIrFBg6
// 6kXeDDXxRAMCb4obEwPxnwzD9E09YLW0DAPELl4F7c8h3iklQBFrQCclkgIMFrZm
// djc9078u++UyLEk6lqfw94ZDlSFiEYqFn+SoKwIDAQABAoIBAQCM9zIb5kGb+lKw
// Bq2WvEV3jWGK2909y23D+vPO7IUmUc1fqkf6EKnSXnjUBbb9hPTpDtTlrHtYIz1D
// /+CUq5D5koKc3hRfcwJogifre+AaC0/OxaKBQbrCfxINSB242aRcNveZ8gaWmLy7
// xCNcHmI3/uNHgBbY97t3TqAy//Afym/aCtfAdBOgv/AaWPfygrEkMEKoLyzRbkh7
// /l51RWFT5w385IGvBNDmUwDLhH9bEx5aegs0PqnHu5tf569EJ18X8Rrp8aEwcgzt
// rMg4SGemSi1S39YfPb5XPAvy111dPmoaLywZCnsupR9ga9B4tm//JjlLTMKgvye9
// cr5dGNvBAoGBANs5Lt+Ny6YpkX347FDg8iF92NM8wTd/yCg/JDE/fQfe+ZX3wJTQ
// PprPA2R7ltUhkubhIECyRF+iEoyPK7vvCUvoJRygE319zDWzMAXRaxGuarGiR6Kz
// GpISHu5sD9yiaZvaWz4Qv30r0lkz4rFb94kQ7GcwBjAsTpz81BgGr6U7AoGBANlN
// 7weako8GFJqUJCHLUkYHrZyEbfUBtk3HAOTIm4CQ3rM6GjYn7IGXxPv1FI51PFQv
// tSvdOJX3rWA2YzeMhlyNWTEIxK7u8X8lLOAwoYFDCvARVlb7rfxA9mE8kLrcVPa2
// 44Z9wH/afQAo6kCvSCZ2vH656E9SAHGVZ/+kVBnRAoGBALIo5dQeu4udqrUS8JLG
// TWE0klsRvAErovI6ZmJzs1wLNRFQ2LzYBJjxdlNaMXmioG1sNjb96Z1C7Qo4bJV+
// LTL4RfjeixhofOaDapq/1+D1u5YDSW6LWiOuAF9JiRaJE4Tqz05AdC74xylhhnEX
// SbOmAknV+KF70KO6wW+JN4PzAoGBALjaaQno3d+45nIQryPoWBamlXNd3EPdrv0+
// 2m3EkTOvCSMhvAZxs+kR+En1VAVTiXx8EPw9ddNtHBmKaqBodCvrOgJSWS4OqXTl
// ZOVZuSnCpF1QAkiAVKMPiAdzhBLRN52gOrC/7K9WZ5tpMszPzuqZewO6lfpT4Xi+
// BfgcDEbhAoGAVdO3VnHIKFzNYP2yCOBw3HwUzuJCZbnAu5X4owEjdJZGNsxchVj8
// F0j/ZVGxOZDE/BfCb8U+k/scVpt0IkfqSIBw5DUDAsQA1Nx9/koDmk+wgT2kquSC
// YDnUm0rHjsU01NAIDTDYiQsS5ycqvyWBu9JPMNMTX0KXQhGiqDHfhjs=
// -----END RSA PRIVATE KEY-----`);
// const key = new NodeRSA();
// console.log(key);






document.querySelector("button")?.addEventListener("click", async () => {
//     //LINK - получаем хеш строки с помощью алгоритма SHA-256
    async function getSHA256Hash(str:string) {
        const buf = new TextEncoder().encode(str);
        const digest = await crypto.subtle.digest('SHA-256', buf);
        return Array.from(new Uint8Array(digest))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
//     console.log(await getSHA256Hash('1'))
//     console.log(await getSHA256Hash('2'))



//     //LINK - кодирование строки в Base64
//     let encodedString = btoa("hello i str");
//     console.log(encodedString);

//     //LINK - декодирование строки из Base64
//     let decodedString = atob(encodedString);
//     console.log(decodedString)



//     //LINK - 
//     // let nodeRSA = new NodeRSA(publicKey , privateKey , 2048)
    
    
    
    

// //NOTE - 


// Ваши данные, которые нужно подписать
const message = "";


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
-----END RSA PRIVATE KEY-----`;



// Сообщение, которое мы хотим подписать
// const message = 'This is a secret message.';

// Импортируем приватный ключ
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

// Создаем подпись
const md = forge.md.sha256.create();
md.update(message, 'utf8');

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
        },
        body: ""
    })
    console.log(data);
    data = await data.json()
    console.log(data);
})



// https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest_API/Sending_and_Receiving_Binary_Data


// "�/�������ip�y�%��m��\�������xo�\E ��Զ+���9w��#1����j��������bymΜ���#��-[1Ċ���E�h�N_x?:��C'	�E�}���7�+�+����!�}��*��ו0z� " +
// "�Fn���O���r�l`�4����i�&6�B�2i��-�+Q䢒G���Ǣ" +
// "�E���_�Ť_�����/S����#��z��xF�v�{�ز��N{͂�Y1_%,��"





// var oReq = new XMLHttpRequest();
// oReq.open("GET", "/myfile.png", true);
// oReq.responseType = "arraybuffer";

// oReq.onload = function (oEvent) {
//   var blob = new Blob([oReq.response], { type: "image/png" });
//   // ...
// };

// oReq.send();