import {Config} from '@/Config';
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl: Config.API_URL});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Post', 'Get'],
  endpoints: builder => ({
    addSeller: builder.mutation({
      query: data => ({
        url: '/addSeller',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    addProduct: builder.mutation({
      query: data => ({
        url: '/addProduct',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    getListProductBySellerId: builder.query({
      query: seller_id => `/listProductBySellerId?seller_id=${seller_id}`,
      providesTags: (result, error, arg) => [{type: 'Get', id: arg}],
    }),
    getListProductByKeyword: builder.query({
      query: keyword => `/searchProductByKeyword?keyword=${keyword}`,
      providesTags: (result, error, arg) => [{type: 'Get', id: arg}],
    }),
  }),
});

export const {
  useAddSellerMutation,
  useAddProductMutation,
  useLazyGetListProductBySellerIdQuery,
  useLazyGetListProductByKeywordQuery,
} = api;
