const CartItemCounter = document.getElementById("CartItemCounter");
const ProductItems = document.getElementById("Items");
const CartBtn = document.getElementById("CartBtn");
const CartSection = document.getElementById("CartSection");
const CartItems = document.getElementById("Cart");
const HideCartBtn = document.getElementById("HideCartBtn");

const items = [
    {
        item: "Apple",
        price: 100
    },
    {
        item: "Banana",
        price: 40
    },
    {
        item: "kiwi",
        price: 200
    },
    {
        item: "PineApple",
        price: 180
    },
    {
        item: "Papaya",
        price: 100
    },
    {
        item: "Grapes",
        price: 100
    },
    {
        item: "Mango",
        price: 100
    }
]


// getting cartArr lenght
const cartCounter = () => {
    const cart = localStorage.getItem("cart");
    const cartArr = JSON.parse(cart);
    if (cartArr == null) {
        CartItemCounter.innerText = 0;
    } else {
        CartItemCounter.innerText = cartArr.length;
    }
}


const getData = ((items) => {
    ProductItems.innerHTML = '';
    items.forEach(item => {
        ProductItems.innerHTML += `
       <div class="item flex">
       <h2>${item.item}</h2>
       <h2>${item.price}</h2>
       <button class="AddToCart btn">Add to Cart</button>
   </div>
       `
    });
    cartCounter();
})(items);


// pushing items into cartArr 
// pushing items into cartArr 
function addToCart() {
    const addToCart = document.querySelectorAll(".AddToCart");
    addToCart.forEach((ele, index) => {
        ele.addEventListener("click", () => {
            const cartArr = localStorage.getItem("cart");
            if (cartArr == null) {
                cart = [];
            } else {
                cart = JSON.parse(cartArr);
            }
            const cartObj = new Object();
            cartObj.item = items[index].item;
            cartObj.price = items[index].price;
            cart.push(cartObj)
            localStorage.setItem("cart", JSON.stringify(cart));
            cartCounter();
            showCartItems();
        })
    })
}

addToCart();


// cartButton for show card
CartBtn.addEventListener("click", () => {
    CartSection.style.animation = "cartIn 1.5s";
    CartSection.hidden = false;
    showCartItems();
})


// cartButton for hide card
HideCartBtn.addEventListener("click", () => {
    CartSection.style.animation = "cartOut 1.5s";
    const hideCart = setTimeout(() => {
        CartSection.hidden = true;
    }, 1200);
})


// show cart items in the cart section
const showCartItems = () => {
    const cart = localStorage.getItem("cart");
    const cartArr = JSON.parse(cart);
    if (cartArr == null) {
        CartItems.innerHTML = 'Your cart is empty please add some products';
    } 
    else {
        CartItems.innerHTML = '';
        cartArr.forEach((ele) => {
        CartItems.innerHTML += `
        <div class="cart_item flex">
            <h3>${ele.item}</h3>
            <h3>${ele.price}</h3>
            <button class="btn removeItem">Remove</button>
        </div>
        `
        })
        removeItemCart()
    }
    totalPrice(cartArr);
    cartCounter();
}


const removeItemCart = () => {
    const removeItem = document.querySelectorAll(".removeItem");
    removeItem.forEach((ele, index) => {
        ele.addEventListener("click", () => {
            const cart = localStorage.getItem("cart");
            const cartArr = JSON.parse(cart);
            cartArr.splice(cartArr[index], 1);
            localStorage.setItem("cart", JSON.stringify(cartArr));
            if (cartArr.length == 0) {
                localStorage.clear();
            }
            showCartItems();
            cartCounter();
            totalPrice(cartArr);
        })
    })
}

function totalPrice(cartArr) {
    const cartTotal = document.getElementById("cartTotal");
    const price = document.querySelector(".total_price");
    const items = document.querySelector(".total_items");
    let totalPrice = 0;
    if (cartArr == null || cartArr.length <= 1) {
        cartTotal.style.display = "none"
    }else{
        cartTotal.style.display = "flex"
        for (let i = 0; i < cartArr.length; i++) {
            totalPrice = totalPrice + cartArr[i].price; }
            price.textContent = `Total price : ${totalPrice}`;
            items.textContent = `Total items : ${cartArr.length}`
        }
}