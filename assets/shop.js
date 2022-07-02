let productList = [
    {
        name: "IPhone",
        price: 1000,
        image: "https://i.ebayimg.com/images/g/T38AAOSwPGBeJrV1/s-l200.webp",
        discount: false
    },
    {
        name: "PlayStation",
        price: 750,
        image: "https://i.ebayimg.com/images/g/uIAAAOSw7PNeJrV1/s-l200.webp",
        discount: true
    },
    {
        name: "Shoes",
        price: 300,
        image: "https://i.ebayimg.com/images/g/atoAAOSwZzVeJrV1/s-l200.webp",
        discount: true
    },
    {
        name: "Watch",
        price: 550,
        image: "https://i.ebayimg.com/images/g/ikgAAOSwWb5fkEGQ/s-l200.webp",
        discount: true
    },
    {
        name: "Book",
        price: 70,
        image: "https://i.ebayimg.com/images/g/8Z0AAOSwik1fkEGQ/s-l200.webp",
        discount: false
    }
];

let totalSum = 0;

let shopHolder = document.getElementById("shop-holder");

productList.forEach((product, i) => {
    shopHolder.innerHTML += 
    `<div class="shop-product">
        <img class="product-image" src="${product.image}">
        <p class="product-name">${product.name}</p>
        <p class="product-price">$${product.price}</p>
        <button class="add-to-cart" onclick="addProductToCart(${i})">Add to cart</button>
    </div>`;
});

function addProductToCart(productIndex) {
    if (productList[productIndex].discount == true) {
        totalSum = totalSum + productList[productIndex].price - 1;
    } else {
        totalSum = totalSum + productList[productIndex].price;
    };

    document.getElementById("total-sum").innerText = "Total: $" + totalSum;

    document.getElementById("buy-button").style.display = "block";
}