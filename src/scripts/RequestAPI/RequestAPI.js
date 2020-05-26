class RequestAPI{
    get(url){
       return fetch(url).then((response) => response.json())
    }

    post(){

    }

    put(){

    }

    delete(){
        
    }

}

export {RequestAPI};