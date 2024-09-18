import { clearCart } from "@/redux/features/card/cardSlice";
import { useAddOrderInfoMutation } from "@/redux/features/products/productApi";
import { useAddPaymentMutation } from "@/redux/features/stripe/stripeApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckoutForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const [details, setDetails] = useState({name:'', email: ''})
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const products = useAppSelector((store) => store.cart.products);
  const checkoutForm = useAppSelector((store) => store.cart.checkoutForm);

  console.log("card", checkoutForm);
  

  const [clientSecret, setClientSecret] = useState("");
  const { tax, grandTotal } = useAppSelector((store) => store.cart);
  const [addPayment, { data, isLoading, isError, isSuccess }] = useAddPaymentMutation();
  const [addOrderInfo] = useAddOrderInfoMutation()

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await addPayment({ price: grandTotal }).unwrap();
        setClientSecret(response?.clientSecret);
      } catch (error) {
        console.error("Payment error:", error);
      }
    };

    initiatePayment();
  }, [addPayment, grandTotal]);


  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
    if(!details.name || !details.email){
      for(const key in details){
        if(!details[key]){
          setError(`${key} field is incomplete!`);
          return; 
        }
      }
    }
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: "mdshohed170@gmail.com" || "anonymous",
            name: "mdshohed" || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm Error");
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log(`transaction id: ${paymentIntent.id}`);
        setTransactionId(paymentIntent.id);


        const orderProduct = products.map( (item: any)=> ({
          productId: item?._id,
          name: item?.name,
          category: item?.category,
          brand: item?.brand,
          orderQuantity: item?.quantity,
          unitPrice: item?.price,
          tax: tax, 
        }))
        const orderData = {
          name: checkoutForm.name, 
          email: checkoutForm.email, 
          phoneNumber: checkoutForm.phoneNumber,
          deliveryAddress: checkoutForm.deliveryAddress,
          orderProducts: orderProduct,
        }
        const res = await addOrderInfo(orderData).unwrap();
              
        if(res.statusCode===200&&res.success){
          setTimeout(()=>{},1000);
          dispatch(clearCart())
          navigate('/success');
        }
        
        if(isError){
          toast.error(`${res.message}`);
        }

      }
    }
  };

  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 flex justify-center">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-xl ms-2 font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Payment
            </h2>

            <div className="mt-6 sm:mt-5 lg:flex lg:items-start lg:gap-12">
              <form
                onSubmit={handleSubmit}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="full_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Full name
                    </label>
                    <input
                      onChange={(e)=> setDetails({...details, name: e.target.value})}
                      type="text"
                      id="full_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="Shohedul Islam"
                      // required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Email
                    </label>
                    <input
                      onChange={(e)=> setDetails({...details, email: e.target.value})}
                      type="text"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="abc@gmail.com"
                      // pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                      // required
                    />
                  </div>
                </div>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "18px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                <button
                  disabled={!stripe || !clientSecret}
                  type="submit"
                  className="flex w-full my-5 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Pay now
                </button>
                <p className="text-red-600">{error}</p>
                  {transactionId && (
                    <p className="text-green-500 text-center text-2xl">
                      Your Transaction Id: {transactionId}
                    </p>
                  )}
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <form className="max-w-[500px] mx-auto my-10" onSubmit={handleSubmit}>
        <button
          className="mt-4 mb-8 w-full rounded-md bg-blue-900 px-6 py-3 font-medium text-white"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-500 text-center text-2xl">
            Your Transaction Id: {transactionId}
          </p>
        )}
      </form> */}
    </div>
  );
};

export default CheckoutForm;
