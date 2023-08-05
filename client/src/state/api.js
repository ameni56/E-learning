import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Formations", "Agents","Populations","Formateurs"],
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
    getFormateurs: build.query({
      query: () => "client/formateurs",
      providesTags: ["Formateurs"],
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
    createFormation: build.mutation({
      query: (formation) => ({
        url: `client/formations/add`,
        method: "POST",
        body: formation,
      }),
    }),
//Populations
    getPopulations: build.query({ // Opération de lecture de toutes les populations
      query: () => "pop/populations",
      providesTags: ["Populations"],
    }),

    getPopulationById: build.query({ // Opération de lecture d'une population par ID
      query: (id) => `client/populations/${id}`,
      providesTags: ["Populations"],
    }),

    createPopulation: build.mutation({ // Opération de création d'une population
      query: (population) => ({
        url: "pop/populations",
        method: "POST",
        body: population,
      }),
      invalidatesTags: ["Populations"], // Invalidation des données en cache après la création
    }),

    updatePopulation: build.mutation({ // Opération de mise à jour d'une population
      query: ({ id, population }) => ({
        url: `pop/populations/${id}`,
        method: "PUT",
        body: population,
      }),
      invalidatesTags: ["Populations"], // Invalidation des données en cache après la mise à jour
    }),

    deletePopulation: build.mutation({ // Opération de suppression d'une population
      query: (id) => ({
        url: `pop/populations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Populations"], // Invalidation des données en cache après la suppression
    }),
      // New endpoints for Module
      getModules: build.query({
        query: () => "mod/modules",
        providesTags: ["Modules"],
      }),
  
      getModuleById: build.query({
        query: (id) => `mod/modules/${id}`,
        providesTags: ["Modules"],
      }),
  
      createModule: build.mutation({
        query: (module) => ({
          url: "mod/modules",
          method: "POST",
          body: module,
        }),
        invalidatesTags: ["Modules"],
      }),
  
      updateModule: build.mutation({
        query: ({ id, module }) => ({
          url: `mod/modules/${id}`,
          method: "PUT",
          body: module,
        }),
        invalidatesTags: ["Modules"],
      }),
      

      deleteModule: build.mutation({
        query: (id) => ({
          url: `mod/modules/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Modules"],
      }),
      getFormationsByUserEmail: build.query({
        query: (userEmail) => `client/formation/${userEmail}`,
        providesTags: ["Formations"],
      }),

      acceptFormation: build.mutation({
        query: (id) => ({
          url: `client/formations/${id}/accept`,
          method: "PUT",
        }),
        // Optionally, you can invalidate the "Formations" tag after accepting the formation to refresh the list
        invalidatesTags: ["Formations"],
      }),
      refuseFormation: build.mutation({
        query: (id) => ({
          url: `client/formations/${id}/refuse`,
          method: "PUT",
        }),
        // Optionally, you can invalidate the "Formations" tag after refusing the formation to refresh the list
        invalidatesTags: ["Formations"],
    }),
    getFormationsByUserEmailPopulation: build.query({
      query: ({ userEmail, populationCible }) =>
        `client/formation/${userEmail}/${populationCible}`,
      providesTags: ["Formations"],
    }),
  }),
  });
 

export const {
  useGetUserQuery,
  useGetFormationsQuery,
  useGetAgentsQuery,
  useGetFormateursQuery,
  useUpdateFormationMutation,
  useDeleteFormationMutation,
  useCreateFormationMutation,
  useGetPopulationsQuery, // Hook pour lire toutes les populations
  useGetPopulationByIdQuery, // Hook pour lire une population par ID
  useCreatePopulationMutation, // Hook pour créer une population
  useUpdatePopulationMutation, // Hook pour mettre à jour une population
  useDeletePopulationMutation, // Hook pour supprimer une population
  // New hooks for Module
  useGetModulesQuery,
  useGetModuleByIdQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
useGetFormationsByUserEmailQuery,
useAcceptFormationMutation,
useRefuseFormationMutation,
useGetFormationsByUserEmailPopulationQuery,

} = api;
