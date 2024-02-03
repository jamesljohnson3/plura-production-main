"use client"
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function App() {
  const { userId } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const webhookResp = await fetch('https://hook.us1.make.com/3r9qh4vyr9xg0fylcq4kixx8jjkfftzq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password, confirmPassword })
      });
      // Handle the webhook response
      const webhookData = await webhookResp.json();
      console.log(webhookData);
      // Redirect to the link returned by the webhook
      if (webhookData.link) {
        window.location.href = webhookData.link;
      }
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <section>
      <br></br><br></br>
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col">
            <div>
              <h2 className="text-4xl text-black">Create a Password for your Workspace </h2>
            </div>
          </div>
          {error && <p>Error: {error}</p>}
          {success && <p>Password resetting...</p>}
          <form onSubmit={handleSubmit}>
            <input autoComplete="false" type="hidden" />
            <input name="_redirect" type="hidden" value="https://workspace.unlimitpotential.com" />
            <div className="mt-4 space-y-6">
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600" htmlFor="password">
                  Password
                </label>
                <input
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="******"
                  autoComplete="off"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600" htmlFor="confirmPassword">
                  Confirm password
                </label>
                <input
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="******"
                  autoComplete="off"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="col-span-full">
                <button
                  className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex  hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div><br></br>
        <p   className="items-center justify-center text-sm font-medium text-gray-600">After updating you will be redirected back to log into Unlimited Now </p>

          </form>
        </div>      </div>
   

  </section>


  );
}
