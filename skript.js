// Selektorid
const shopInput = document.querySelector(".shop-input");
const shopButton = document.querySelector(".shop-button");
const shopList = document.querySelector(".shop-list");
const filterOption = document.querySelector(".filter-shop");



//EVEnt listeners

shopButton.addEventListener("click", addShop);
shopList.addEventListener('click', deleteCheck);
filterOption.addEventListener("click", filterShop);


//FUnktsions

function addShop(event) {
    //console.log("hello");
    // Prevent form from submitting 
    event.preventDefault();
    // shop DIV

    const shopDiv = document.createElement("div");
    shopDiv.classList.add("shop");

    // create LI
    const newShop = document.createElement('li');
    newShop.innerText = shopInput.value;
    newShop.classList.add('shop-item');
    shopDiv.appendChild(newShop);

    // ccheck mark button
    const completedButton = document.createElement('Button');
    completedButton.innerText = 'TÕMBA MAHA'
    completedButton.classList.add("complete-btn");
    shopDiv.appendChild(completedButton);
    // ccheck trash mark button
    const trashButton = document.createElement('Button');
    trashButton.innerText = 'X';
//<i class="fas fa-trash-alt"></i>
    trashButton.classList.add("trash-btn");
    shopDiv.appendChild(trashButton);
    //APPEND to list
    shopList.appendChild(shopDiv);
//  clear todo input value
    shopInput.value = "";
}

// kustutamine
function deleteCheck(e){
    //console.log(e.target);
    const item = e.target;
    //kUSTUTAMINE
    // kui vajutab kusuta, siis see kustutab ülesande
    if(item.classList[0] === 'trash-btn'){
        const shop = item.parentElement;
        shop.classList.add("fall");
        //animation
        shop.addEventListener('transitionend', function(){
            shop.remove();
        });
        
    }
    
    // Tõmba maha  ?? ei tööta
    if(item.classList[0] === "complete-btn"){
        const shop = item.parentElement;
        shop.classList.toggle('completed');
    }
}

function filterShop(e){
    const shops = shopList.childNodes;
    console.log(shops);
    shops.forEach(function(shop){
        switch(e.target.value){
            case "all":
                shop.style.display = "flex"
                break;
            case "completed":
                if(shop.classList.contains("completed")){
                    shop.style.display = "flex";
                }else{
                    shop.style.display = "none";
                }
        }
    });
}