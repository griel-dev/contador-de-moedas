

setTimeout(() => {
        addFade()

}, 1000);
setTimeout(() => {
        removeElement()

}, 1300);
        
function addFade(){
        document.querySelector("#loading").classList.add("fadeOut");
}
function removeElement(){
        document.querySelector("#loading").remove();
        document.querySelector("body").removeAttribute('style');
}