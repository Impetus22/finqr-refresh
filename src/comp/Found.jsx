import React from 'react'
import Section from '../components/Section'
import curve from "../assets/curve.png"; //TODO: settare immagine di delimiter
import Button from '../components/Button';

const Found = () => {
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      
      id="found"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">Have you found and returned an object?</h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-1 lg:mb-8">
            Fill in the form below with the secret reward code and your paypal account to redeem your reward
          </p>

          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="rewardCode" className="block text-sm font-medium text-yellow-400">
                Reward Code
              </label>
              <input
                type="text"
                id="rewardCode"
                name="rewardCode"
                className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your reward code"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="paypalEmail" className="block text-sm font-medium text-yellow-400">
                PayPal Email
              </label>
              <input
                type="email"
                id="paypalEmail"
                name="paypalEmail"
                className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your PayPal email"
              />
            </div>

            <Button href="/pricing" white>
              Redeem
            </Button>
          </form>
        </div>
      </div>
    </Section>
  )
}

export default Found
