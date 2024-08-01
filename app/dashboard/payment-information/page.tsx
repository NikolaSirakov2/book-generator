'use client';
import Link from 'next/link'
import React, {useState} from 'react'

function PaymentInformation() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-[89vh] lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 mt-10 sm:px-12 sm:mt-0 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-3xl sm:col-span-1">Payment Information</h1>
            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && (
                  <p className="text-red-500">Please enter a valid email</p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && (
                  <p className="text-red-500">Please enter a password</p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date:
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-1/2 rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && (
                  <p className="text-red-500">Please enter a password</p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV:
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-1/2 rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && (
                  <p className="text-red-500">Please enter a password</p>
                )}
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Link
                  href="/dashboard"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Pay Now
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>

    
  )
}

export default PaymentInformation