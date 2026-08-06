import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ItemsResponse } from "../../types/item";

export const itemsApi = createApi({
  reducerPath: "itemsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  tagTypes: [
    "Items",
    "Selected",
  ],

  // cache data for 30 seconds
  keepUnusedDataFor: 30,

  endpoints: (builder) => ({
    // get all items from server
    getItems: builder.query<
      ItemsResponse,
      {
        startItems: number;
        endItems: number;
        search: string;
      }
    >({
      query: ({
        startItems,
        endItems,
        search,
      }) =>
        `/items?startItems=${startItems}&endItems=${endItems}&search=${search}`,

      providesTags: [
        "Items",
      ],
    }),

    // get selected items from server
    getSelected: builder.query<
      ItemsResponse,
      {
        startItems: number;
        endItems: number;
        search: string;
      }
    >({
      query: ({
        startItems,
        endItems,
        search,
      }) =>
        `/select?startItems=${startItems}&endItems=${endItems}&search=${search}`,

      providesTags: [
        "Selected",
      ],
    }),

    // select item and move it to right list
    selectItem: builder.mutation<
      { message: string },
      number
    >({
      query: (id) => ({
        url: "/select",

        method: "POST",

        body: {
          id,
        },
      }),

      invalidatesTags: [
        "Items",
        "Selected",
      ],
    }),

    // remove item from selected list
    deleteItem: builder.mutation<
      { message: string },
      number
    >({
      query: (id) => ({
        url: `/select/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: [
        "Items",
        "Selected",
      ],
    }),

    // add new item with custom id
    addItem: builder.mutation<
      {
        message: string;
        item: {
          id: number;
          title: string;
        };
      },
      number
    >({
      query: (id) => ({
        url: "/items",

        method: "POST",

        body: {
          id,
        },
      }),

      invalidatesTags: [
        "Items",
      ],
    }),

    // save new order after drag and drop
    reorder: builder.mutation<
      {
        message: string;
      },
      number[]
    >({
      query: (order) => ({
        url: "/reorder",

        method: "POST",

        body: {
          order,
        },
      }),

      invalidatesTags: [
        "Selected",
      ],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetSelectedQuery,
  useSelectItemMutation,
  useDeleteItemMutation,
  useAddItemMutation,
  useReorderMutation,
} = itemsApi;
