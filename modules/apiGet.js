'use strict'
async function apiGet(url){
    const request = await fetch(url)
    if(!request.ok){
        //need some debug info here and expand this to a proper try catch with maybe some attempt again exponential timer thing
    }
    const data = request.json()
    return data
}
export default apiGet