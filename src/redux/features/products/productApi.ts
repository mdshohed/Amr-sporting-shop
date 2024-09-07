import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    login: builder.mutation({
      query: ( userInfo ) => {
        console.log(userInfo);
        
        return {
          url: '/product',
          method: 'POST',
          body: userInfo, 
        }
      }
    })
  })
})

export const { useLoginMutation } = productApi; 