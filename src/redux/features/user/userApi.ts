import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    createUserInfo: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo);
        return{
          url: '/user',
          method: 'POST',
          body: userInfo,
        }}
      }
    ),
    getUserInfo: builder.query({
      query: () => ({
          url: '/user',
          method: 'GET',
        })
      }
    )
  })
})

export const { useCreateUserInfoMutation, useGetUserInfoQuery } = productApi; 