import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    addOrderInfo: builder.mutation({
      query: (orderInfo) => {
        return{
          url: '/order',
          method: 'POST',
          body: orderInfo,
        }},
        invalidatesTags: ['products'],
      }
    ),
    getOrderInfo: builder.query({
      query: () => ({
          url: '/order',
          method: 'GET',
        })
      }
    )
  })
})

export const { useAddOrderInfoMutation, useGetOrderInfoQuery } = orderApi; 