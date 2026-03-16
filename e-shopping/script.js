const cartBtn = document.getElementById("cart")
const cartContainer = document.getElementById("cart-container")

let cartItems = []


cartBtn.onclick = () => {
    const cartDiv = document.createElement("div")

    cartDiv.innerHTML = `
        <div id="cartSidebar" class="fixed top-0 right-0 h-full w-80 bg-cream shadow-2xl z-50 flex flex-col translate-x-full transition-transform duration-500 ease-in-out">
            
            <div class="flex items-center justify-between p-6 border-b border-charcoal/10">
                <h3 class="font-display font-bold text-xl">Your Cart</h3>
                <button id="closeCart" class="text-charcoal/40 hover:text-charcoal transition-colors text-2xl">&times;</button>
            </div>

            <div class="flex-1 overflow-y-auto no-scrollbar p-6" id="cartItems">
            </div>

            <div class="p-6 border-t border-charcoal/10">
                <div class="flex justify-between mb-5">
                    <span class="text-sm opacity-50">Subtotal</span>
                    <span class="font-medium" id="cartTotal">₹0</span>
                </div>
                <button class="w-full bg-gold text-charcoal text-xs font-medium tracking-widest uppercase py-4 rounded-full">
                    Checkout
                </button>
            </div>

        </div>
        <div id="cartOverlay" class="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-40 opacity-0 transition-opacity duration-500"></div>
    `

    cartContainer.appendChild(cartDiv)

    setTimeout(() => {
        document.getElementById('cartSidebar').classList.remove('translate-x-full')
        document.getElementById('cartOverlay').classList.remove('opacity-0')
    }, 10)

    renderCart()

    function closeCart() {
        const sidebar = document.getElementById('cartSidebar')
        const overlay = document.getElementById('cartOverlay')
        sidebar.classList.add('translate-x-full')
        overlay.classList.add('opacity-0')
        setTimeout(() => { cartDiv.remove() }, 500)
    }

    document.getElementById('closeCart').onclick = closeCart
    document.getElementById('cartOverlay').onclick = closeCart
}



function renderCart() {
    const cartItemsDiv = document.getElementById("cartItems")
    if (!cartItemsDiv) return

    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = `
            <p class="text-charcoal/40 text-sm text-center mt-16">Your cart is empty.</p>
        `
    } else {
        cartItemsDiv.innerHTML = cartItems.map((item, index) => `
            <div class="flex gap-4 mb-6 border-b border-charcoal/10 pb-6">
                <div class="w-20 aspect-[3/4] overflow-hidden rounded-lg flex-shrink-0">
                    <img src="${item.img}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <p class="font-display font-bold text-sm">${item.name}</p>
                    <p class="text-xs opacity-50 mt-1">Size: M</p>
                    <div class="flex items-center justify-between mt-3">
                        <p class="text-sm font-medium">${item.price}</p>
                        <button onclick="removeFromCart(${index})" class="text-xs text-red-400 hover:text-red-600 transition-colors">Remove</button>
                    </div>
                </div>
            </div>
        `).join('')
    }

    const total = cartItems.reduce((sum, item) => {
        const num = parseInt(item.price.replace(/[^0-9]/g, ''))
        return sum + num
    }, 0)

    const cartTotal = document.getElementById("cartTotal")
    if (cartTotal) cartTotal.textContent = "₹" + total.toLocaleString('en-IN')
}


function removeFromCart(index) {
    cartItems.splice(index, 1)
    renderCart()
}


document.querySelectorAll(".add-to-cart").forEach(btn => {
    let added = false

    btn.addEventListener('click', () => {
        added = !added

        if (added) {
            const card = btn.closest(".cloths")
            const name = card.querySelector(".name").textContent
            const price = card.querySelector(".product-price").textContent
            const img = card.querySelector("img").src

            cartItems.push({ name, price, img })

            btn.textContent = "ADDED ✓"
            showToast("Added to cart!")
        } else {
            const card = btn.closest(".cloths")
            const name = card.querySelector(".name").textContent
            cartItems = cartItems.filter(item => item.name !== name)

            btn.textContent = "ADD TO CART"
            showToast("Removed from cart!")
        }

        renderCart()
    })
})


function showToast(msg) {
    const t = document.getElementById('toast')
    t.textContent = msg
    t.classList.remove('opacity-0')
    t.classList.add('opacity-100')
    setTimeout(() => {
        t.classList.remove('opacity-100')
        t.classList.add('opacity-0')
    }, 2500)
}