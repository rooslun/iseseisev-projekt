// Selektorid
const shopInput = document.querySelector(".shop-input");
const shopButton = document.querySelector(".shop-button");
const shopList = document.querySelector(".shop-list");
const filterOption = document.querySelector(".filter-shop");



//EVEnt listeners
document.addEventListener("DOMContentLoad", getShops);
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
    //local storagesse lisamine
    saveLocalShops(shopInput.value);

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
        removeLocalShops(shop);
        //animation
        shop.addEventListener('transitionend', function(){
            shop.remove();
        });
        
    }
    
    // Tõmba maha  ?? ei tööta
    if(item.classList[0] === "complete-btn"){
        const shop = item.parentElement;
        shop.classList.toggle("completed");
    }
}

//filtrid
function filterShop(e){
    const shops = shopList.childNodes;
    shops.forEach(function(shop){
        switch (e.target.value) {
            case "all":
                shop.style.display = "flex";
                break;
            case "completed":
                if(shop.classList.contains("completed")){
                    shop.style.display = "flex";
                } else {
                    shop.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!shop.classList.contains('completed')){
                    shop.style.display = "flex";
                } else {
                    shop.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalShops(shop){
    //kontroll, kas on juba olemas
    let shops;
    if(localStorage.getItem('shops') == null){
        shops = [];
    }else{
        shops = JSON.parse(localStorage.getItem('shops'));
    }

    shops.push(shop);
    localStorage.setItem('shops', JSON.stringify(shops));
}
function getShops(){
    let shops;
    if(localStorage.getItem('shops') == null){
        shops = [];
    }else{
        shops = JSON.parse(localStorage.getItem('shops'));
    }
    shops.forEach(function(shop){ 
            // shop DIV

        const shopDiv = document.createElement("div");
        shopDiv.classList.add("shop");

        // create LI
        const newShop = document.createElement('li');
        newShop.innerText = shop;
        newShop.classList.add('shop-item');
        shopDiv.appendChild(newShop);

        // ccheck mark button
        const completedButton = document.createElement('Button');
        completedButton.innerText = 'TÕMBA MAHA'
        completedButton.classList.add("complete-btn");
        shopDiv.appendChild(completedButton);
        //local storagesse lisamine


        // ccheck trash mark button
        const trashButton = document.createElement('Button');
        trashButton.innerText = 'X';
        //<i class="fas fa-trash-alt"></i>
        trashButton.classList.add("trash-btn");
        shopDiv.appendChild(trashButton);
        //APPEND to list
        shopList.appendChild(shopDiv);


    });
}
function removeLocalShops(shop){
    let shops;
    if(localStorage.getItem('shops') == null){
        shops = [];
    }else{
        shops = JSON.parse(localStorage.getItem('shops'));
    }
    const shopIndex = shop.children[0].innerText;
    shops.splice(shops.indexOf(shopIndex), 1);
    localStorage.setItem("shops", JSON.stringify(shops));
}





//  KALKULAATOR

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
          case 'x²': 
          computation = prev * prev;
          break;
        case 'x³':
          computation = prev * prev * prev;
          break;
        case '√':
          computation = Math.sqrt(prev);
          break;
        case 'π':
          computation = 3.14159265359 * prev; //approximately
          break;
          case 'e':
            computation = 2.718281828 * prev; //approximately
            break;
        case '-':
          computation = prev - current
          break
        case 'x':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })





  // GENERAATOR


  let btn = document.getElementById('btn');
  let qoutput = document.getElementById('qoutput');
  let quotes = ["Õun", "Banaan", "Pirn", "Burger", "Pannkoogid", "Jäätis", "Kummikommid", "Pirn", "Kala", "Lihapallid"];
  
  btn.addEventListener('click', function(){
      var randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      qoutput.innerHTML = randomQuote;
  })


  // Muusika
  function Song1() {
    document.getElementById('mysong').src = "Kuule.mp3";
  }
  
  function Song2() {
    document.getElementById('mysong').src = "Beautiful.mp3";
  }

  // Tausta pic

const IMAGE_URLS = {
  nature: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80',
  pencils: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80',
};
// Sets the background image
const setBackground = (image) => {
  document.body.style.background = "url('"+IMAGE_URLS.[image]+"')";
};
if (isWeekend) {
  setBackground('nature');
} else {
  setBackground('pencils');
}