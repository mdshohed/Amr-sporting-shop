import { clearCart } from "@/redux/features/card/cardSlice";
import { useAddOrderInfoMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const paymentGatewayPK = import.meta.env.PAYMENT_GATEWAY_PK;


const Checkout = () => {
  console.log("value",paymentGatewayPK);

  const dispatch = useAppDispatch()
  const products = useAppSelector((store) => store.cart.products);
  const [addOrderInfo,  {data, isLoading, isError, isSuccess}] = useAddOrderInfoMutation()

  const {tax, taxRate, grandTotal, totalPrice, selectedItems}= useAppSelector((store)=>store.cart)
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '', email: '', phoneNumber: '', deliveryAddress: ''

  })
  const [paymentType, setPaymentType] = useState("cash");
  
  const navigate = useNavigate(); 
  const handlePlaceOrder = () =>{
    if(paymentType=='cash') {
      
      for( const key in deliveryDetails){
        if(deliveryDetails[key]===''){
          return toast.warning(`${key} field is empty`);
        }
      }
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
        name: deliveryDetails.name, 
        email: deliveryDetails.email, 
        phoneNumber: deliveryDetails.phoneNumber,
        deliveryAddress: deliveryDetails.deliveryAddress,
        orderProducts: orderProduct,
      }
      addOrderInfo(orderData);
      dispatch(clearCart())
      
      if(isSuccess){
        navigate('/success');
      }
      // console.log("data", data,isLoading, isError );
      
      // if(isError){
      //   toast.error(`${data}`);
      // }
    }
    else{
      navigate('/payment/card');
    }
  }

  return (
    <div className="mx-auto container max-w-7xl px-4">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row ">
        <div className="mt-4 py-2 text-xs  sm:mt-0 mx-auto  sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"

                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="grid lg:grid-cols-2 ">
        <div className="pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {
              products && products.map((product: any )=>(
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    {product?.name}
                  </span>
                  <span className="float-right text-gray-400">Unit Price: { (product?.price).toFixed(2) }</span>
                  <p className="text-md font-semibold">{`$${product?.price} x ${product?.quantity}  = $${(product?.quantity*product?.price).toFixed(3)}` }</p>
                </div>
              </div>
              ))
            }
          </div>

          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div onClick={() => setPaymentType('cash')} className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked={paymentType === 'cash'}
                onChange={() => setPaymentType('cash')}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cash on Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                </div>
              </label>
            </div>
  
            <div onClick={() => setPaymentType('card')} className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked={paymentType === 'card'}
                onChange={() => setPaymentType('card')}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Stripe (optional)</span>
                  <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                </div>
              </label>
            </div>
          </form>

        </div>

        {/* Payment Details */}
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Delivery Details</p>
          <p className="text-gray-400">
            Complete your order by providing your Delivery details.
          </p>
          <div className="">
            <label className="mt-4 mb-2 block text-sm font-medium">Full Name</label>
            <div className="relative">
              <input
                onChange={(e)=>setDeliveryDetails({...deliveryDetails, name: e.target.value})}
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <div className="relative">
              <input
                onChange={(e)=>setDeliveryDetails({...deliveryDetails, email: e.target.value})}
                type="text"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
            </div>
            
            <label className="mt-4 mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <div className="relative">
              <input
                onChange={(e)=>setDeliveryDetails({...deliveryDetails, phoneNumber: e.target.value})}
                type="text"
                id="number"
                name="number"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your Phone Number here"
              />
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">
              Delivery Address
            </label>
            <div className="relative">
              <input
                onChange={(e)=>setDeliveryDetails({...deliveryDetails, deliveryAddress: e.target.value})}
                type="text"
                id="address"
                name="address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Delivery Address here"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">${totalPrice.toFixed(3)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Tax</p>
                <p className="font-semibold text-gray-900">${tax.toFixed(3)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900 text-">Free Shipping</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">${grandTotal.toFixed(3)}</p>
            </div>
          </div>
          <button 
          disabled={!products.length} 
          onClick={handlePlaceOrder} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>
        </div>
      </div>

      {/* <div className="h-screen grid grid-cols-3">
        <div className="lg:col-span-2 col-span-3 space-y-8 ">
          <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium ml-3">Checkout</div>
            </div>
            <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
              Complete your shipping and payment details below.
            </div>
            <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
          <div className="rounded-md">
            <form id="payment-form" method="POST" action="">
              <section>
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  Checkout
                </h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">Name</span>
                    <input
                      name="name"
                      className="focus:outline-none px-3"
                      placeholder="Try Odinsson"
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">Email</span>
                    <input
                      name="email"
                      type="email"
                      className="focus:outline-none px-3"
                      placeholder="try@example.com"
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">Address</span>
                    <input
                      name="address"
                      className="focus:outline-none px-3"
                      placeholder="10 Street XYZ 654"
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">City</span>
                    <input
                      name="city"
                      className="focus:outline-none px-3"
                      placeholder="San Francisco"
                    />
                  </label>
                  <label className="inline-flex w-2/4 border-gray-200 py-3">
                    <span className="text-right px-2">State</span>
                    <input
                      name="state"
                      className="focus:outline-none px-3"
                      placeholder="CA"
                    />
                  </label>
                  <label className="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                    <span className="text-right px-2 xl:px-0 xl:text-none">
                      ZIP
                    </span>
                    <input
                      name="postal_code"
                      className="focus:outline-none px-3"
                      placeholder="98603"
                    />
                  </label>
                  <label className="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                    <span className="text-right px-2">Country</span>
                    <div
                      id="country"
                      className="focus:outline-none px-3 w-full flex items-center"
                    >
                      <select
                        name="country"
                        className="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                      >
                        <option value="AU">Australia</option>
                        <option value="BE">Belgium</option>
                        <option value="BR">Brazil</option>
                        <option value="CA">Canada</option>
                        <option value="CN">China</option>
                        <option value="DK">Denmark</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="HK">Hong Kong</option>
                        <option value="IE">Ireland</option>
                        <option value="IT">Italy</option>
                        <option value="JP">Japan</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MX">Mexico</option>
                        <option value="NL">Netherlands</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="SG">Singapore</option>
                        <option value="ES">Spain</option>
                        <option value="TN">Tunisia</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                      </select>
                    </div>
                  </label>
                </fieldset>
              </section>
            </form>
          </div>
          <div>
            <button className="submit-button px-4 py-3 rounded-full bg-black text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
              Place Order
            </button>
          </div>
        </div>
        
        <div className="col-span-1 bg-white lg:block hidden">
          <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Summary
          </h1>
          <ul className="py-6 border-b space-y-6 px-8">
            <li className="grid grid-cols-6 gap-2 border-b-1">
              <div className="col-span-1 self-center">
                <img
                  src="https://bit.ly/3oW8yej"
                  alt="Product"
                  className="rounded w-full"
                />
              </div>
              <div className="flex flex-col col-span-3 pt-2">
                <span className="text-gray-600 text-md font-semi-bold">
                  Studio 2 Headphone
                </span>
                <span className="text-gray-400 text-sm inline-block pt-2">
                  Red Headphone
                </span>
              </div>
              <div className="col-span-2 pt-3">
                <div className="flex items-center space-x-2 text-sm justify-between">
                  <span className="text-gray-400">2 x $30.99</span>
                  <span className="text-pink-400 font-semibold inline-block">
                    $61.98
                  </span>
                </div>
              </div>
            </li>
            <li className="grid grid-cols-6 gap-2 border-b-1">
              <div className="col-span-1 self-center">
                <img
                  src="https://bit.ly/3lCyoSx"
                  alt="Product"
                  className="rounded w-full"
                />
              </div>
              <div className="flex flex-col col-span-3 pt-2">
                <span className="text-gray-600 text-md font-semi-bold">
                  Apple iPhone 13
                </span>
                <span className="text-gray-400 text-sm inline-block pt-2">
                  Phone
                </span>
              </div>
              <div className="col-span-2 pt-3">
                <div className="flex items-center space-x-2 text-sm justify-between">
                  <span className="text-gray-400">1 x $785</span>
                  <span className="text-pink-400 font-semibold inline-block">
                    $785
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-8 border-b">
            <div className="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-pink-500">$846.98</span>
            </div>
            <div className="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-pink-500">Free</span>
            </div>
          </div>
          <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>$846.98</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Checkout;
