let cart = document.getElementById("cart")
let cartContainer = document.getElementById("cart-container")

cart.onclick = () => {
    cart = document.createElement("div")

    cart.innerHTML = `
        <div id="cartSidebar" class="fixed top-0 right-0 h-full w-80 bg-cream shadow-2xl z-50 flex flex-col translate-x-full transition-transform duration-500 ease-in-out">
            
            <div class="flex items-center justify-between p-6 border-b border-charcoal/10">
                <h3 class="font-display font-bold text-xl">Your Cart</h3>
                <button id="closeCart" class="text-charcoal/40 hover:text-charcoal transition-colors text-2xl">&times;</button>
            </div>

            <div class="flex-1 overflow-y-auto no-scrollbar p-6">
                <p class="text-charcoal/40 text-sm text-center mt-16">Your cart is empty.</p>
            </div>

            <div class="p-6 border-t border-charcoal/10">
                <div class="flex justify-between mb-5">
                    <span class="text-sm opacity-50">Subtotal</span>
                    <span class="font-medium">₹0</span>
                </div>
                <button class="w-full bg-gold text-charcoal text-xs font-medium tracking-widest uppercase py-4 rounded-full">
                    Checkout
                </button>
            </div>

        </div>
        <div id="cartOverlay" class="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-40 opacity-0 transition-opacity duration-500"></div>
    `

    cartContainer.appendChild(cart)

    // ✅ Small delay needed so browser registers starting state first
    setTimeout(() => {
        document.getElementById('cartSidebar').classList.remove('translate-x-full')
        document.getElementById('cartOverlay').classList.remove('opacity-0')
    }, 10)

    // Close function
    function closeCart() {
        const sidebar = document.getElementById('cartSidebar')
        const overlay = document.getElementById('cartOverlay')

        // Slide out first
        sidebar.classList.add('translate-x-full')
        overlay.classList.add('opacity-0')

        // Remove from DOM after animation finishes
        setTimeout(() => {
            cart.innerHTML = ''
        }, 500)
    }

    document.getElementById('closeCart').onclick = closeCart
    document.getElementById('cartOverlay').onclick = closeCart

};

function showToast(msg) {
     const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.remove('opacity-0');
      t.classList.add('opacity-100');
      setTimeout(() => { t.classList.remove('opacity-100'); t.classList.add('opacity-0'); }, 2500);
}

document.querySelectorAll(".add-to-cart").forEach(btn =>{
    let added =false
    btn.addEventListener('click', ()=> {
        added =!added
        showToast("Added to cart!")
        btn.textContent = "ADDED ✓"
        if (!added) {
            btn.textContent ="ADD TO CART"
             showToast("Removed from cart")
        }
})
})

