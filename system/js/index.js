class index
{

    

    openFooter(){
        document.querySelector("footer").classList.toggle('open');
    }
    checkField(item){
        let newValue = item.value.replace(/[^0-9]/g, '')
        console.log(newValue);
        item.value = newValue;
    }
}

const indexjs = new index();

document.querySelector("#open-footer").addEventListener("click", function(){
    indexjs.openFooter();
})

fields = document.querySelectorAll("input");
fields.forEach(input => {
    input.addEventListener("input", function(){
        indexjs.checkField(input);
    });
    input.addEventListener("focus", function(){
        if (input.value == 0 || input.value == '') {
            input.value = '';
        }
    });
    input.addEventListener("blur", function(){
        if (input.value == 0 || input.value == '') {
            input.value = '0';
        }
    });
    
})