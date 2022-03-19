export default function addGlobalEventListener(action, selector, callback){
    document.addEventListener(action, e => {
        if(e.target.matches(selector)){
            callback(e)
        }
    })

}
