import { baseApi } from "../../api/baseApi";

const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    addPayment: builder.mutation({
      query: (orderInfo) => ({
        url: '/create-payment-intent',
        method: 'POST',
        body: orderInfo,
      }),
      // transformResponse: (response) => {
      //   return {
      //     clientSecret: response.clientSecret, // Ensure clientSecret is returned
      //   };
      // },
      }
    ),
  })
})

export const { useAddPaymentMutation } = stripeApi; 