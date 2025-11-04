import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container-responsive py-6 text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} CrazyCaps. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a className="hover:text-blue-600" href="#">Términos</a>
            <a className="hover:text-blue-600" href="#">Privacidad</a>
            <a className="hover:text-blue-600" href="#">Contacto</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com" target="_blank" aria-label="Instagram" className="hover:text-pink-600" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM17.8 6.2a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" aria-label="Facebook" className="hover:text-blue-600" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.7V12h2.7V9.7c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.3.1v2.5h-1.6c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12z"/>
            </svg>
          </a>
          <a href="https://x.com" target="_blank" aria-label="X" className="hover:text-gray-900 dark:hover:text-gray-100" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3 3h4.6l4.6 6.5L17.7 3H21l-7.4 9.7L21.6 21H17l-4.9-6.9L6.8 21H3.4l7.9-10.4L3 3z"/>
            </svg>
          </a>
          <a href="https://wa.me/5491112345678" target="_blank" aria-label="WhatsApp" className="hover:text-green-600" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M20 3.9A10 10 0 0 0 4.6 17.5L3 21l3.6-1.6A10 10 0 1 0 20 3.9zm-8 15.1c-1.8 0-3.5-.6-4.8-1.8A6.8 6.8 0 0 1 6.1 7 6.8 6.8 0 0 1 18 12a6.8 6.8 0 0 1-6 7z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

