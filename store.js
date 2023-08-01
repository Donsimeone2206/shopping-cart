const removeBtn = document.querySelectorAll(".btn-danger")
const addBtn = document.querySelectorAll(".shop-item-button")
const cartItems = document.querySelector(".cart-items")
const cartQty = document.querySelectorAll(".cart-quantity-input")
const priceTotal = document.querySelector(".cart-total-price")

// declared array where cart items are saved
const cartItemsArr = []  

// constuctor function to create new cart object
function CartObj(title, image, price,){
    this.title = title,
    this.image = image,
    this.price = price
    this.qty = 1
}


for(let btn of addBtn) {
    btn.addEventListener("click", addCartItem)
}
for(let btn of removeBtn) {
    btn.addEventListener("click", removeCartItem)
}
for(let qty of cartQty) {
    qty.addEventListener("change", qtyChanged)
}

//render cart item function
function renderCartItem(){
    cartItems.innerHTML = ""
    for(let item of cartItemsArr){
        cartItems.innerHTML += `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src=${item.image} width="100" height="100">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="${item.qty}">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`
    }
    updateCartTotal()
    const removeBtns = cartItems.querySelectorAll(".btn-danger")
    for(let removeBtn of removeBtns){
        removeBtn.addEventListener("click", removeCartItem)
    }
    const qtyChangeBtns = cartItems.querySelectorAll(".cart-quantity-input")
    for(let qtyChangeBtn of qtyChangeBtns){
        qtyChangeBtn.addEventListener("change", qtyChanged)
    }
}

// add cart item function
function addCartItem(e) {
    const target= e.target.parentElement.parentElement
    const title = target.querySelector(".shop-item-title").innerText
    const image = target.querySelector(".shop-item-image").src
    const price = target.querySelector(".shop-item-price").innerText
    const newCartItemObj = new CartObj(title, image, price)
    for (let item of cartItemsArr) {
        if(item.title == newCartItemObj.title){
            alert("This item has already been added to your cart")
            return
        }
    }
        cartItemsArr.push(newCartItemObj)
        renderCartItem() 
}

//remove cart item function
function removeCartItem(e) {
    const target = e.target.parentElement.parentElement
    const title = target.querySelector(".cart-item-title").innerText
    for(let i = 0; i < cartItemsArr.length; i++){
        if (cartItemsArr[i].title == title){
            cartItemsArr.splice(i, 1)
        }
    }
    renderCartItem()
}

//item quantity function
function qtyChanged(e) {
    const qty = e.target
    console.log(qty);
    const target = qty.parentElement.parentElement
    console.log(target);
    const title = target.querySelector(".cart-item-title").innerText
    console.log(title);
    if (isNaN(qty.value) || qty.value <= 0) {
        qty.value = 1
    }
    let foundItem = cartItemsArr.find((item) => {
        return item.title == title
    })
    console.log(foundItem);
    foundItem.qty = qty.value
    updateCartTotal()
}

// update price total function
function updateCartTotal() {
    const cartRows = cartItems.querySelectorAll(".cart-row")
    let total = 0
    for(let cartRow of cartRows) {
        let priceEl = cartRow.querySelector(".cart-price")
        let qtyEl = cartRow.querySelector(".cart-quantity-input")
        let price =  (Number(priceEl.innerText.replace("$", "")))
        let qty = qtyEl.value
        total += price * qty 
    }
    if (cartItemsArr.length > 0) {
        total = Math.round(total * 100) / 100
        
    } else {
        total = 0
    }
    priceTotal.innerText = "$" +total
}

