class RequestAPI{
    get(url){
       return (fetch(url)
        .then((response) =>{
           return response.json();
        }))
    }

    post(url){

    }

    put(){

    }

    delete(){
        
    }
}

export {RequestAPI};