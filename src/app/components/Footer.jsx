"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className=" mx-auto px-5 md:px-10">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">TRIPPPIO</h2>
            <p className="mt-2 text-gray-400">
              Building great experiences, one website at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0H1.325C.594 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.745v-3.622h3.075V8.413c0-3.048 1.862-4.708 4.583-4.708 1.301 0 2.419.097 2.745.14v3.18h-1.885c-1.48 0-1.767.704-1.767 1.733v2.276h3.532l-.461 3.622h-3.071V24h6.027c.73 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.723c-.95.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.379 4.482A13.978 13.978 0 011.671 3.149a4.92 4.92 0 001.523 6.573A4.902 4.902 0 01.96 9.1v.062a4.923 4.923 0 003.95 4.827 4.902 4.902 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.864 9.864 0 010 19.54a13.936 13.936 0 007.548 2.209c9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.637A10.025 10.025 0 0024 4.557z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.225 0H1.771C.792 0 0 .775 0 1.728v20.544C0 23.228.792 24 1.771 24h20.451C23.2 24 24 23.228 24 22.272V1.728C24 .775 23.2 0 22.225 0zM7.125 20.452H3.684V9.042h3.441v11.41zM5.405 7.744a1.994 1.994 0 01-1.998-2.005c0-1.113.888-2.008 1.998-2.008s1.998.895 1.998 2.008c0 1.117-.888 2.005-1.998 2.005zM20.452 20.452h-3.441v-5.768c0-1.372-.025-3.136-1.911-3.136-1.915 0-2.21 1.494-2.21 3.034v5.87h-3.441V9.042h3.304v1.557h.047c.46-.873 1.585-1.793 3.266-1.793 3.492 0 4.136 2.3 4.136 5.289v6.357z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} TRIPPPIO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
