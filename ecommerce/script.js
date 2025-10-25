let products = [
    {name:"Nike Shoes", price:1800, img:"https://img.tatacliq.com/images/i27//437Wx649H/MP000000028730145_437Wx649H_202510102126462.jpeg"},
    {name:"Smart Watch", price:2200, img:"https://m.media-amazon.com/images/I/71AcGKTe9+L._AC_SL1500_.jpg"},
    {name:"Backpack", price:950, img:"https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?cs=srgb&dl=pexels-bertellifotografia-2905238.jpg&fm=jpg"},
    {name:"JBL Headphones", price:1300, img:"https://tse4.mm.bing.net/th/id/OIP.zItA2m-u7Bovm2B7joJptgHaLu?rs=1&pid=ImgDetMain&o=7&rm=320"},
    {name:"Sunglasses", price:700, img:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcThFxlKymIY_dk6KX9MYXcFYfGjXJGRSgDPad6S94yuviquAI5t6RydeVl5Al-WlEHvAnXF-y1_GD1z2y5aONqy9xiEYDNHdDbJEIfFykZPlnwPWO9juDPwTw"},
    {name:"Leather Wallet", price:500, img:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQhKWFipCGwZhyUPlsTCYVZO1TO7Wu1JsSKvumcwigLV5yOXUwn-nzGzCtwuoTyKiAT1Q8U3tnypIXr5jlh6xUjW6mS0txOjuxzqu_ZOIQRjv4BPvqCn6mepA"},
    {name:"Bluetooth Speaker", price:1500, img:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTKRXf0u_ROcHSVQLnAl7afiSg-9xYT8FIT7HKIbQF0dsMRw5AlO-inhdVfTH2_mOlO75kw6pQMir2lhuTznEaXzb--0mN24-X-YsRWEG14N_Amms0rk8PLhsE"},
    {name:"Fitness Band", price:1200, img:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTftfyH0yp24VF_tOhDzKwNTWgIjJrlQfS5f7Acm8CeKcgUiGEoScBK5fC1hA3iu65-H93CZ9TxIq7qzcqU9RucShTjRSlUpZ6oyywRsK7EBdHCo2ip7kv0"},
];

let cart = [];
let count = 0;
let total = 0;

// Show products
let productDiv = document.getElementById("products");

products.map((p,i)=>{
    productDiv.innerHTML += `
    <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addCart(${i})">Add to Cart</button>
    </div>`;
})

function addCart(i){
    cart.push(products[i]);
    count++;
    total += products[i].price;

    document.getElementById("cartCount").innerText = count;
    document.getElementById("total").innerText = total;

    showCart();
}

function showCart(){
    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    
    cart.map((c,i)=>{
        cartList.innerHTML += `
        <li>
            ${c.name} — ₹${c.price}
            <button class="remove-btn" onclick="removeItem(${i})">x</button>
        </li>`;
    })
}

function removeItem(i){
    total -= cart[i].price;
    cart.splice(i,1);
    count--;
    
    document.getElementById("total").innerText = total;
    document.getElementById("cartCount").innerText = count;

    showCart();
}

