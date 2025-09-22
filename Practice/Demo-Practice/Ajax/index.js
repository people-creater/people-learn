//原生ajax
const xhr = new XMLHttpRequest()
// xhr.open('GET', '/api/users')//?后面可以拼接参数
// xhr.send()
// xhr.onreadystatechange = function () {
//     // readyState 4 表示请求完成
//   if (xhr.readyState === 4) {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       console.log(xhr.response)
//     } else {
//       console.log(xhr.response)
//     }
//   }
// }//get只能发送纯文本



// xhr.open('POST', '/api/users')
// xhr.setRequestHeader('Content-Type', 'application/json')//设置请求头
// xhr.send(JSON.stringify({
//   name: 'why',
//   age: 18
// }))
// xhr.onreadystatechange = function () {
//   // readyState 4 表示请求完成
//   if (xhr.readyState === 4) {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       console.log(xhr.response)
//     } else {
//       console.log(xhr.response)
//     }
//   }
// }

//axios
    (async ()=>{
        const ins = axios.create({
            baseURL: '/api',
            timeout: 1000
        })
        ins.interceptors.request.use(config =>{
            console.log('请求成功')
            return config
        })
        ins.interceptors.response.use(res =>{
            console.log('响应成功')
            return res
        })

        const res1 = await ins.get('/get',{
            params: {
                name: 'why',
                age: 18
            }
        })
        const res2 = await ins.post('/post',{
            data: {
                name: 'why',
                age: 18
            }
        })
    })


// Fetch API
fetch('/api/users')
.then(res =>{
    if (res.ok){
        return res.json()
    }
})
.then(data=>{
    console.log(data)
})

fetch('/api/post',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({//将数据转换成json格式
        name: 'why',
        age: 18
    })
})
