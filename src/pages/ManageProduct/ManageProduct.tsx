import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  // useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/products/productApi";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { imageUpload } from "@/utils";
import { TProduct } from "@/types/types";
import LoadingSpinner from "../shared/LoadingSpinner";
import PaginationComponent from "../shared/Pagination";
import StarRating from "@/components/Rating/StarRating";

const ManageProduct = () => {
  const [modalMode, setModalMode] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Local loading state

  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState<TProduct[]>([]);
  const { data, isLoading: apiLoading } = useGetAllProductsQuery(null);

  useEffect(() => {
    if (data && data.data) {
      setProducts(data.data);
    }
  }, [data]);

  // const { data: singleProduct } = useGetSingleProductQuery();  // Skip query if no product is selected
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleShowModal = (mode: string = "add", data?: any) => {
    setModalMode(mode);
    if (mode == "edit") {
      setSelectedProduct(data);
    }
  };

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const stock = parseFloat(form.stock.value);
    const description = form.description.value;
    const category = form.category.value;
    const brand = form.brand.value;
    const price = parseFloat(form.price.value);
    const rating = parseFloat(form.rating.value);
    const productDescription = form.productDescription.value;
    const image = form.image.files[0];

    try {
      const image_url = await imageUpload(image);
      const productDetail = {
        name: name,
        description: description,
        category: category,
        brand: brand,
        stockQuantity: stock,
        rating: rating,
        productDescription: productDescription,
        price: price,
        image: image_url,
      };
      for (const key in productDetail) {
        if (productDetail[key] == "") {
          toast.warning(`${key} field is incomplete!`);
          return;
        }
      }
      const response = await addProduct(productDetail).unwrap();
      if (response.statusCode === 200 && response.success) {
        toast.success(response?.message);
      } else {
        toast.error("Product Added Error");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleUpdateProduct = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    console.log("call function");

    const image = form.image.files[0];
    const updatedData = {};
    for (const key in selectedProduct) {
      if (key == "_id" || key == "__v" || key == "updatedAt") continue;
      updatedData[key] = selectedProduct[key];
    }
    if (image) {
      const image_url = await imageUpload(image);
      updatedData.image = image_url;
      console.log("image", updatedData, image_url);

      const res = await updateProduct({
        id: selectedProduct?._id,
        updatedProduct: updatedData,
      }).unwrap();

      if (res.statusCode === 200 && res.success) {
        toast.success(`${res.message}`);
      } else toast.error("Product Update Error!");
    } else {
      const res = await updateProduct({
        id: selectedProduct?._id,
        updatedProduct: updatedData,
      }).unwrap();

      if (res.statusCode === 200 && res.success) {
        toast.success(`${res.message}`);
      } else toast.error("Product Update Error!");
    }

    // const updatedData = {};
    // for (const key in selectedProduct) {
    //   if (key == "_id" || key == "__v" || key == "updatedAt") continue;
    //   updatedData[key] = selectedProduct[key];
    // }
    // // console.log("array", updatedData);
    // setShowModal(false);
    // const res = await updateProduct({
    //   id: selectedProduct?._id,
    //   updatedProduct: updatedData,
    // }).unwrap();
    // if (res.statusCode === 200 && res.success) {
    //   toast.success(`${res.message}`);
    // } else toast.error("Product Update Error!");
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    toast.success("Product Deleted Successful");
  };

  const handleSearchProduct = (e: string) => {
    const newProduct = [...data.data];
    const findProducts = newProduct.filter((product) =>
      product.name.toLowerCase().includes(e.toLowerCase())
    );

    setProducts(findProducts);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!apiLoading) {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [apiLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto container max-w-7xl px-4">
      {/* <!-- Start block --> */}
      <Dialog>
        <section className="bg-gray-50 dark:bg-gray-900 antialiased my-10">
          <div className="mx-auto max-w-screen-2xl ">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          />
                        </svg>
                      </div>
                      <input
                        onChange={(e) => handleSearchProduct(e.target.value)}
                        type="text"
                        id="simple-search"
                        placeholder="Search for products"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <DialogTrigger onClick={() => handleShowModal("add")}>
                    <button
                      type="button"
                      id="createProductButton"
                      data-modal-toggle="createProductModal"
                      className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                      <svg
                        className="h-3.5 w-3.5 mr-1.5 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        />
                      </svg>
                      Add product
                    </button>
                  </DialogTrigger>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        Product
                      </th>
                      <th scope="col" className="p-4">
                        Description
                      </th>
                      <th scope="col" className="p-4">
                        Category
                      </th>
                      <th scope="col" className="p-4">
                        Brand
                      </th>
                      <th scope="col" className="p-4">
                        Price
                      </th>
                      <th scope="col" className="p-4">
                        Stock
                      </th>
                      <th scope="col" className="p-4">
                        Rating
                      </th>

                      <th scope="col" className="p-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product: any) => (
                      <tr className="border-b text-center dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center mr-3">
                            <img
                              src={product?.image}
                              alt="iMac Front Image"
                              className="h-8 w-8 mr-3"
                            />
                            {product?.name}
                          </div>
                        </th>
                        <td className="px-4 py-3">
                          <span className="bg-primary-100 text-start text-primary-800 text-xs font-medium  py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {product?.description}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-primary-100 text-primary-800 text-md font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {product?.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-primary-100 text-primary-800 text-md font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {product?.brand}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-primary-100 text-primary-800 text-md font-bold px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            ${product?.price}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <div
                              className={`h-4 w-4 rounded-full inline-block mr-2 ${
                                product?.stockQuantity <= 5
                                  ? "bg-red-700"
                                  : product?.stockQuantity <= 10
                                  ? "bg-yellow-600"
                                  : "bg-green-500"
                              }`}
                            ></div>
                            {product?.stockQuantity}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          
                          {/* <button className="flex items-center gap-1 rounded-lg bg-yellow-400 py-1 px-2 ">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_12657_16865)">
                                <path
                                  d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                                  fill="white"
                                />
                                <g clip-path="url(#clip1_12657_16865)">
                                  <path
                                    d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                                    fill="white"
                                  />
                                </g>
                              </g>
                              <defs>
                                <clipPath id="clip0_12657_16865">
                                  <rect width="18" height="18" fill="white" />
                                </clipPath>
                                <clipPath id="clip1_12657_16865">
                                  <rect width="18" height="18" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <span className=" font-medium text-white">
                              {product?.rating}
                            </span>
                          </button> */}
                           <StarRating rating={product?.rating}></StarRating> {product?.rating}
                        </td>

                        {/* Action Button */}
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center space-x-4">
                            <DialogTrigger
                              asChild
                              onClick={() => handleShowModal("edit", product)}
                            >
                              <button
                                type="button"
                                data-drawer-target="drawer-update-product"
                                data-drawer-show="drawer-update-product"
                                aria-controls="drawer-update-product"
                                className="py-2 px-3 flex items-center text-sm font-medium text-center text-black bg-blue-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 -ml-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                  <path
                                    fill-rule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                Edit
                              </button>
                            </DialogTrigger>

                            <button
                              onClick={() => handleDeleteProduct(product?._id)}
                              // type="button"
                              data-modal-target="delete-modal"
                              data-modal-toggle="delete-modal"
                              className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 -ml-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
               <div>
                <PaginationComponent></PaginationComponent>
              </div>
              </nav>
            </div>
          </div>
        </section>

        {/* add Product */}
        {modalMode == "add" ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                <div className="h-[550px] overflow-y-auto">
                  <form onSubmit={handleAddProduct}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Product Name
                        </label>
                        <input
                          // onChange={(e) =>
                          //   setProductDetails({
                          //     ...productDetails,
                          //     name: e.target.value,
                          //   })
                          // }
                          // value={productDetails?.name}
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type product name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="stock"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Stock
                        </label>
                        <input
                          // onChange={(e) =>
                          //   setProductDetails({
                          //     ...productDetails,
                          //     stockQuantity: parseInt(e.target.value),
                          //   })
                          // }
                          // value={productDetails?.stockQuantity}
                          type="number"
                          name="stock"
                          id="stock"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Stock"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <input
                          // onChange={(e) =>
                          //   setProductDetails({
                          //     ...productDetails,
                          //     description: e.target.value,
                          //   })
                          // }
                          // value={productDetails?.description}
                          type="text"
                          name="description"
                          id="description"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Description"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Category
                        </label>
                        <input
                          // onChange={(e) =>
                          //   setProductDetails({
                          //     ...productDetails,
                          //     category: e.target.value,
                          //   })
                          // }
                          // value={productDetails?.category}
                          type="text"
                          name="category"
                          id="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Category"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="brand"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Brand
                        </label>
                        <input
                          // onChange={(e) =>
                          //   setProductDetails({
                          //     ...productDetails,
                          //     brand: e.target.value,
                          //   })
                          // }
                          // value={productDetails?.brand}
                          type="text"
                          name="brand"
                          id="brand"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product brand"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price
                        </label>
                        <input
                          // onChange={(e) =>
                          //   setProductDetails({
                          //     ...productDetails,
                          //     price: parseInt(e.target.value),
                          //   })
                          // }
                          // value={productDetails?.price}
                          type="number"
                          name="price"
                          id="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="$2999"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Rating"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rating
                        </label>
                        <input
                          // onChange={(e) =>
                          //   setProductDetails({
                          //     ...productDetails,
                          //     rating: parseInt(e.target.value),
                          //   })
                          // }
                          // value={productDetails?.rating}
                          type="number"
                          name="rating"
                          id="Rating"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Rating"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="productDescription"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          productDescription
                        </label>
                        <textarea
                          // onChange={(e) =>
                          //   setProductDetails({
                          //     ...productDetails,
                          //     productDescription: e.target.value,
                          //   })
                          // }
                          // value={productDetails?.productDescription}
                          id="productDescription"
                          name="productDescription"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Write product productDescription here"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Product Images
                      </span>
                      <div className="flex justify-center items-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col justify-center items-center w-full h-54 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="mb-3 w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>

                          {/* <input
                          required
                          type='file'
                          id='image'
                          name='image'
                          accept='image/*'
                        /> */}
                          <input
                            id="dropzone-file"
                            type="file"
                            name="image"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                      <DialogClose asChild>
                        <button
                          type="submit"
                          className="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Add product
                        </button>
                      </DialogClose>
                    </div>
                  </form>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        ) : null}

        {modalMode == "edit" ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                <div className="h-[550px] overflow-y-auto">
                  <form onSubmit={handleUpdateProduct}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Product Name
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              name: e.target.value,
                            })
                          }
                          value={selectedProduct?.name}
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type product name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="stock"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Stock
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              stockQuantity: parseFloat(e.target.value),
                            })
                          }
                          value={selectedProduct?.stockQuantity}
                          type="number"
                          name="stock"
                          id="stock"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Stock"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              description: e.target.value,
                            })
                          }
                          value={selectedProduct?.description}
                          type="text"
                          name="description"
                          id="description"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Description"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Category
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              category: e.target.value,
                            })
                          }
                          value={selectedProduct?.category}
                          type="text"
                          name="category"
                          id="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Category"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="brand"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Brand
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              brand: e.target.value,
                            })
                          }
                          value={selectedProduct?.brand}
                          type="text"
                          name="brand"
                          id="brand"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product brand"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              price: parseFloat(e.target.value),
                            })
                          }
                          value={selectedProduct?.price}
                          type="number"
                          name="price"
                          id="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="$2999"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Rating"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rating
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              rating: parseFloat(e.target.value),
                            })
                          }
                          value={selectedProduct?.rating}
                          type="number"
                          name="rating"
                          id="Rating"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Rating"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="productDescription"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          productDescription
                        </label>
                        <textarea
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              productDescription: e.target.value,
                            })
                          }
                          value={selectedProduct?.productDescription}
                          id="productDescription"
                          name="productDescription"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Write product productDescription here"
                        ></textarea>
                      </div>
                    </div>
                    {/* <div className="mb-4">
                      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Product Images
                      </span>
                      <div className="flex justify-center items-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col justify-center items-center w-full h-54 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="mb-3 w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>

                     

                        
                          <input
                            id="dropzone-file"
                            type="file"
                            name="image"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div> */}
                    <div className="mb-4">
                      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Product Images
                      </span>
                      <div className="flex justify-center items-center ">
                        <img
                          src={selectedProduct?.image}
                          className="w-1/2 p-5 rounded-xl"
                        ></img>
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col w-1/2 justify-center items-center me-3  bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col p-2 justify-center items-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="mb-3 w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or drag and drop
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            // onChange={(e) =>
                            //   setSelectedProduct({
                            //     ...selectedProduct,
                            //     image: e.target.image.files[0],
                            //   })
                            // }
                            // value={selectedProduct?.image}
                            name="image"
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                      <DialogClose asChild>
                        <button
                          type="submit"
                          className="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Update product
                        </button>
                      </DialogClose>
                    </div>
                  </form>
                  {/* <form onClick={handleUpdateProduct}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Product Name
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              name: e.target.value,
                            })
                          }
                          value={selectedProduct?.name}
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type product name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="stock"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Stock
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              stockQuantity: parseInt(e.target.value),
                            })
                          }
                          value={selectedProduct?.stockQuantity}
                          type="text"
                          name="stock"
                          id="stock"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Stock"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              description: e.target.value,
                            })
                          }
                          value={selectedProduct?.description}
                          type="text"
                          name="description"
                          id="description"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Description"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Category
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              category: e.target.value,
                            })
                          }
                          value={selectedProduct?.category}
                          type="text"
                          name="category"
                          id="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Category"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="brand"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Brand
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              brand: e.target.value,
                            })
                          }
                          value={selectedProduct?.brand}
                          type="text"
                          name="brand"
                          id="brand"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product brand"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              price: parseInt(e.target.value),
                            })
                          }
                          value={selectedProduct?.price}
                          type="number"
                          name="price"
                          id="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="$2999"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Rating"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rating
                        </label>
                        <input
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              rating: parseInt(e.target.value),
                            })
                          }
                          value={selectedProduct?.rating}
                          type="number"
                          name="Rating"
                          id="Rating"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Product Rating"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="productDescription"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          productDescription
                        </label>
                        <textarea
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              productDescription: e.target.value,
                            })
                          }
                          value={selectedProduct?.productDescription}
                          id="productDescription"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Write product productDescription here"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Product Images
                      </span>
                      <div className="flex justify-center items-center ">
                        
                        <img src={selectedProduct?.image} className="w-1/2 p-5 rounded-xl"></img>
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col w-1/2 justify-center items-center me-3  bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col p-2 justify-center items-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="mb-3 w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or drag and drop
                            </p>
                            
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            onChange={(e) =>
                              setSelectedProduct({
                                ...selectedProduct,
                                image: e.target.image.files[0],
                              })
                            }
                            // value={selectedProduct?.image}
                            name="image"
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                      
                        <button
                          type="button" 
                          className="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Update product
                        </button>
                     
                    </div>
                  </form> */}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
};

export default ManageProduct;
