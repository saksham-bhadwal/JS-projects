let cart = document.getElementById("cart")
let cartContainer = document.getElementById("cart-container")

cart.onclick = () => {
    cart = document.createElement("div")

    cart.innerHTML = `
     <div class="fixed top-0 right-0 h-full w-80 bg-cream shadow-2xl z-50 flex flex-col">

      
        <div class="flex items-center justify-between p-6 border-b border-charcoal/10">
            <h3 class="font-display font-bold text-xl">Your Cart</h3>
            <button id ="closeCart" class="text-charcoal/40 hover:text-charcoal transition-colors text-2xl">&times;</button>
        </div>

      
        <div class="flex-1 overflow-y-auto no-scrollbar p-6">

            <!-- Empty State -->
            <p class="text-charcoal/40 text-sm text-center mt-16">Your cart is empty.</p>

          

        </div>

        <div class="p-6 border-t border-charcoal/10">
            <div class="flex justify-between mb-5">
                <span class="text-sm opacity-50">Subtotal</span>
                <span class="font-medium">₹0</span>
            </div>
            <button
                class="w-full bg-gold text-charcoal text-xs font-medium tracking-widest uppercase py-4 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-300">
                Checkout
            </button>
        </div>

    </div>

    <div id = "cartOverlay" class="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-40"></div>
    `
    cartContainer.appendChild(cart)
    document.getElementById('closeCart').onclick = () => {
        cartContainer.innerHTML = '' 
    }

    document.getElementById('cartOverlay').onclick = () => {
        cartContainer.innerHTML = ''  // close on overlay click
    }
};
