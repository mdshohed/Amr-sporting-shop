import {
  deleteFromCard,
  updateQuantity,
} from "@/redux/features/card/cardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ShoppingCard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/checkout/card");
  };
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.cart.products);

  const { tax, taxRate, grandTotal, totalPrice, selectedItems } =
    useAppSelector((store) => store.cart);
  console.log(taxRate, taxRate * 100);

  const handleQuantity = (type: string, id: string) => {
    const payload = { type, id };
    if (type == "increment") {
      const foundProduct = products.find((product: any) => product._id === id);
      const cardQuantity = foundProduct ? foundProduct.quantity : 0;
      const stockQty = foundProduct.stockQuantity;
      if (stockQty <= cardQuantity) {
        toast.error("Stock Quantity limit Out");
      } else {
        dispatch(updateQuantity(payload));
      }
    } else {
      dispatch(updateQuantity(payload));
    }
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteFromCard(id));
  };

  return (
    <div className="font-sans mx-auto container max-w-7xl px-4">
      <div className="flex flex-col items-center  bg-white my-4 sm:flex-row ">
        <div className="mt-9 py-2 text-xs  sm:mt-0 mx-auto  sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  1
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
                  className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
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

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {products && products?.length ? (
          <div className="md:col-span-2 space-y-4">
                  <h1 className="text-2xl font-medium text-gray-800 pt-2">Your Cart</h1>

            {products &&
              products.map((product: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]"
                >
                  <div className="flex gap-4">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                      <img
                        src={product?.image}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-base font-bold text-gray-800">
                          {product?.name}
                        </h3>
                        <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                          Category: {product?.category}
                        </p>
                        <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                          Brand: {product?.brand}
                        </p>
                        <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                          Unit Price: {product?.price}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-row justify-center items-center border-2 rounded-md">
                          <button
                            onClick={() =>
                              handleQuantity("decrement", product._id)
                            }
                            className="flex  items-center px-2.5 py-1.5 border-r-2  border-gray-300 text-gray-800 text-xs outline-none bg-transparent "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 fill-current"
                              viewBox="0 0 124 124"
                            >
                              <path
                                d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>

                          <span className="mx-5 font-semibold">
                            {product?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantity("increment", product._id)
                            }
                            className="flex items-center px-2.5 py-1.5  border-l-2 border-gray-300 text-gray-800 text-xs outline-none bg-transparent "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5  fill-current"
                              viewBox="0 0 42 42"
                            >
                              <path
                                d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col">
                    <div
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex items-start gap-4 justify-end"
                    >
                      <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 fill-red-500 inline cursor-pointer"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mt-auto">
                      {`$${product?.price} x ${product?.quantity} = $${(
                        product?.price * product?.quantity
                      ).toFixed(2)}`}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="md:col-span-2 space-y-4">
            <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-24 w-24 text-gray-400 mb-4"
                >
                  <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
                </svg>
                <p className="text-gray-600 text-lg font-semibold mb-4">
                  Your shopping cart is empty.
                </p>
                <button onClick={()=>navigate("/all-sporting-goods")} className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300">
                  Let's go shopping!
                </button>
              </div>
            </div>
          </div>
          
        )}

        <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
          <ul className="text-gray-800 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-bold">
                ${totalPrice.toFixed(3)}
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping <span className="ml-auto font-bold">Free</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Vat: {taxRate * 100}%{" "}
              <span className="ml-auto font-bold">${tax.toFixed(3)}</span>
            </li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span className="ml-auto">${grandTotal.toFixed(3)}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              disabled={!products.length}
              type="button"
              onClick={handleNavigate}
              className="text-sm px-4 py-2.5 w-full disabled:bg-gray-500 font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
            >
              Proceed to checkout Button
            </button>
          </div>

          {/* <div className="mt-4 flex flex-wrap justify-center gap-4">
            <img
              src="https://readymadeui.com/images/master.webp"
              alt="card1"
              className="w-10 object-contain"
            />
            <img
              src="https://readymadeui.com/images/visa.webp"
              alt="card2"
              className="w-10 object-contain"
            />
            <img
              src="https://readymadeui.com/images/american-express.webp"
              alt="card3"
              className="w-10 object-contain"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;
