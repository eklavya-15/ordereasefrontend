
import React from 'react';
import axios from 'axios';

const PaymentComponent = ({ userId, userEmail, amount, food }) => {
  const handlePayment = async () => {
    const orderResponse = await axios.post('https://ordereasebackend.vercel.app/create-order', {
      amount,
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36)}`,
      userId,
      userEmail,
      food,
    });

    const { orderId, razorpayKey } = orderResponse.data;

    const options = {
      key: razorpayKey,
      amount: orderResponse.data.amount,
      currency: 'INR',
      name: 'Your Company Name',
      description: `Order for ${food}`,
      order_id: orderId,
      handler: async (response) => {
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id;
        const signature = response.razorpay_signature;

        const verificationResponse = await axios.post('https://ordereasebackend.vercel.app/verify-payment', {
          paymentId,
          orderId,
          signature,
          userId,
          userEmail,
          amount,
          food,
        });

        if (verificationResponse.data.verified) {
          alert('Payment successful!');
        } else {
          alert('Payment verification failed!');
        }
      },
      prefill: {
        name: userId,
        email: userEmail,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button onClick={handlePayment} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
    Confirm and Pay
   </button>
  );
};

export default PaymentComponent;
