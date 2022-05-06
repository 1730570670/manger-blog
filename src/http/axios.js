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