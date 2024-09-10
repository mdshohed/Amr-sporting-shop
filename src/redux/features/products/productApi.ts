import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllProducts: builder.query({
      query: () => ({
          url: '/products',
          method: 'GET',
        })
      }
    ),
    getSingleProduct: builder.query({
      query: (id) => {
        console.log("reduxId",id);
        
        return{
          url: `/products/${id}`,
          method: 'GET',
        }}
      }
    )
  })
})

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productApi; 