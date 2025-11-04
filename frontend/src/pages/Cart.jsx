import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;

  const message = encodeURIComponent(
    "Hola! Me gustaría comprar:\n\n" +
      cart.map((p) => `- ${p.name} ($${p.price})`).join("\n")
  );

  const whatsappLink = `https://wa.me/${whatsapp}?text=${message}`;

  return (
    <div className="min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Carrito</h1>
      {cart.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-gray-600 dark:text-gray-300">
          No hay productos en el carrito.
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {cart.map((p) => (
                <li key={p._id} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 dark:text-gray-100 truncate">{p.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">${p.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(p._id)}
                    className="text-red-700 bg-red-50 hover:bg-red-100 dark:text-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              className="inline-flex justify-center items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-semibold"
            >
              Enviar pedido por WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="inline-flex justify-center items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2.5 rounded-lg font-semibold"
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
