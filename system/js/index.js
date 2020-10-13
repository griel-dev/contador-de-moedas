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
        this.calc(n1.replace("R$","").replace(",","."), n2, subtotal);
    }
    calc(n1, n2, subtotal) {
        let r1 = parseFloat(n1);
        let r2 = parseInt(n2);
        let result = eval(r1 * r2);
        subtotal[0].innerText = 'R$' + result.toFixed(2).toString().replace(".",",");
        this.calcMoedas();
        this.calcNotas();
        this.calcTotal();
    }
    calcMoedas(){
        let moedasSection = document.querySelector("#moedas");
        let moedas = moedasSection.querySelectorAll(".subtotal");
        let totalMoedasArr = [];
        moedas.forEach(value=>{
            let result = value.innerText.replace(",",".").replace("R$","");
            totalMoedasArr.push(parseFloat(result));
        });
        let totalMoedas = totalMoedasArr.reduce((total, numero) => total + numero, 0);
        document.querySelector("#total-m").lastElementChild.innerText = "R$" + totalMoedas.toFixed(2).toString().replace(".",",");
    }
    calcNotas(){
        let notasSection = document.querySelector("#notas");
        let notas = notasSection.querySelectorAll(".subtotal");
        let totalNotasArr = [];
        notas.forEach(value=>{
            let result = value.innerText.replace(",",".").replace("R$","");
            totalNotasArr.push(parseFloat(result));
        });
        let totalNotas = totalNotasArr.reduce((total, numero) => total + numero, 0);
        document.querySelector("#total-n").lastElementChild.innerText = "R$" + totalNotas.toFixed(2).toString().replace(".",",");
    }
    calcTotal(){
        let totalCalc = [];
        let subtotal = document.querySelectorAll(".subtotal");
        
        subtotal.forEach(function(sub){
            let result = sub.innerText.replace("R$","");;
            totalCalc.push(parseFloat(result.replace(",",".")));
        });
        let total = totalCalc.reduce((total, numero) => total + numero, 0);
        console.log("Valor Total: " + total);
        document.querySelector("#total").lastElementChild.innerText = "R$" + total.toFixed(2).toString().replace(".",",");
    }
    clear(){
        let input = document.querySelectorAll("input");
        let subtotal = document.querySelectorAll(".subtotal");
        input.forEach(item=>{
            item.value = "0";
        });
        subtotal.forEach(item=>{
            item.innerText = "R$0,00";
        });
        this.calcTotal();
        this.calcMoedas();
        this.calcNotas();

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

document.querySelector("#clear").addEventListener("click", function(){
    indexjs.clear();
})