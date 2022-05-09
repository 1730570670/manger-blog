import axios from "axios";
export async function ajaxGet(url){
    var i=0;
    await axios.get('http://localhost:8089'+url)
        .then(res=>{
            i = res;
        }).catch(err=>{
            i = err
        })
    return i
}

export async function ajaxPost(url){
    var i=0;
    await axios.post('http://localhost:8089'+url)
        .then(res=>{
            i = res;
        }).catch(err=>{
            i = err
        })
    return i
}

export async function ajaxMethod(method,url,data){
    var i = 0;
    await axios({
        method:method,
        url:'http://localhost:8089'+url,
        data:data
    }).then(res=>{
        i=res;
    }).catch(error=>{
        i=error;
    })
    return i;
}
