import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Formations", "Agents"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getFormations: build.query({
      query: () => "client/formations",
      providesTags: ["Formations"],
    }),
    getAgents: build.query({
      query: () => "client/agents",
      providesTags: ["Agents"],
    }),
    updateFormation: build.mutation({
      query: ({ id, formation }) => ({
        url: `client/formations/${id}`,
        method: "PUT",
        body: formation,
      }),
    }),
    deleteFormation: build.mutation({
      query: (id) => ({
        url: `client/formations/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetFormationsQuery,
  useGetAgentsQuery,
  useUpdateFormationMutation,
  useDeleteFormationMutation,
} = api;
