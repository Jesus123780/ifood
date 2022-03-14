import recommendedCategorieStoreResolver from './recommendedCategorieStore'

export default {
    TYPES: {
        ...recommendedCategorieStoreResolver.TYPES,
    },
    QUERIES: {
        ...recommendedCategorieStoreResolver.QUERIES,
    },
    MUTATIONS: {
        ...recommendedCategorieStoreResolver.MUTATIONS,
    }
}

// https://stackoverflow.com/questions/24920427/sequelize-error-when-using-where-and-in-on-a-subarray