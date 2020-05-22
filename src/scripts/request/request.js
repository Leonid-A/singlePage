// todo - make request -api

// post request

// get request

// put request

// delete request

// ....

// responsetype--->


class Request{
    get(url){
       return (fetch(url)
        .then((response) =>{
            console.log(response)
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

export {Request};