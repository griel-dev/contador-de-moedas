class index
{
    openFooter(){
        document.querySelector("footer").classList.toggle('open');
    }
    checkField(item){
        let newValue = item.value.replace(/[^0-9]/g, '')
        item.value = newValue;
    }
    buttonEvent(oper, input){
        let inputValue = document.getElementById(input).value;
        if (oper == '+') {
            document.getElementById(input).value = eval(parseInt(inputValue) + 1);
        } else if (oper == '-') {
            if (inputValue != 0) {
                document.getElementById(input).value = eval(parseInt(inputValue) - 1);
            }
        }
    }
    getElements(parent){
        let n1 = parent.getElementsByClassName("value")[0].innerText;
        let n2 = parent.getElementsByTagName('input')[0].value;
        let subtotal = parent.getElementsByClassName("subtotal");
        this.calc(n1.replace("R$",""), n2.replace("R$",""), subtotal);
    }
    calc(n1, n2, subtotal) {
        let result = eval(parseFloat(n1.replace(",",".")) * parseFloat(n2)).toFixed(2);
        let final = parseFloat(result);
        console.log(final.toFixed(2).toString())
        console.log(n2.innerText);
        n2.innerText = ''
        this.calcTotal();
    }
    calcTotal(){
        let totalCalc = [];
        let subtotal = document.querySelectorAll(".subtotal")
        subtotal.forEach(function(sub){
            let result = sub.innerText.replace("R$","");
            totalCalc.push(parseFloat(result.replace(",",".")))
            for (let i = 0; i == totalCalc.length-1; i++) {
                let final = totalCalc[i]+totalCalc[i];
               // console.log('Total final: ' + final);
            }
        });
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
        indexjs.getElements(input.parentElement.parentElement)
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
});
buttons = document.querySelectorAll('button');
buttons.forEach(btn=>{
    btn.addEventListener("click", function(){
        indexjs.buttonEvent(btn.innerText, btn.parentElement.parentElement.firstElementChild.id);
        indexjs.getElements(btn.parentElement.parentElement.parentElement);
        let n1 = btn.parentElement.parentElement.parentNode.firstElementChild.innerText.replace("R$","");
        let n2 = btn.parentElement.parentElement.parentNode.lastElementChild;
        let input = btn.parentElement.parentElement.parentNode.getElementsByTagName('input')[0];
        indexjs.calc(n1.replace(",","."), n2, input);
    });
});