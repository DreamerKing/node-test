function compute(array, max){
    let sum = 0;
    let len = array.length;
    for(let i = 0; i < len; i++){
        if(sum < max) {
            sum += array[i];
        } 
    }
}

