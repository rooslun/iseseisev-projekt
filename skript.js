// Selektorid
const shopInput = document.querySelector(".shop-input");
const shopButton = document.querySelector(".shop-button");
const shopList = document.querySelector(".shop-list");



//EVEnt listeners

shopButton.addEventListener("click", addShop);


//FUnktsions

function addTodo(event) {
    // Prevent form from submitting 
    event.preventDefault();
    // shop DIV
    const shopDiv = document.createElement("div");
    shopDiv.classList.add("shop");
    // create LI
    const newShop = document.createElement("li");
    newShop.innerText = "hey";
    newShop.classList.add("shop-item");
    shopDiv.appendChild(newShop);
    // ccheck mark button
    const completedButton = document.createElement("Button");
    completedButton.innterText = '<i class="fas fa-check"></i>'
    //_____
    completedButton.classList.add("complete-btn");
    shopDiv.appendChild(completedButton);
    // ccheck trash mark button
    const trasButton = document.createElement("Button");
    trashButton.innterText = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("complete-btn");
    shopDiv.appendChild(trashButton);
    //APPEND to list
    shopList.appendChild(trashButton);
}