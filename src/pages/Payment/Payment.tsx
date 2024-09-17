import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,

} from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

// const paymentGatewayPK = import.meta.env.PAYMENT_GATEWAY_PK;


// const stripePromise = loadStripe(import.meta.env.PAYMENT_GATEWAY_PK);
const stripePromise = loadStripe('pk_test_51L2b0xGxIFJC1OANbUH0gPXgCXdBnKy2SywsHmIvnOGkad1XXygdKhQ4NaDIPGBIVUQdqiHcnsbF535d9yWJli1x00Uaf0y01h');

const Payment = () => {  
  
  return (
    <div className="mx-auto container max-w-7xl p-4">
      {/* <div className='text-lg text-orange-400 text-center'>
        <h1>Please Pay</h1>
      </div>
      <div className='text-3xl border-t-2 border-b-2 w-40 mx-auto text-center my-2'>
        <h1 className='py-2'>Payment</h1>
      </div> */}
       <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
   
  );
};

export default Payment;