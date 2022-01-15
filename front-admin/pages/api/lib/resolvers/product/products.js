import { ApolloError } from 'apollo-server-micro'
import CatStore from '../../models/information/CategorieStore'
import Store from '../../models/Store/Store'
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export default {
    TYPES: {
       
    },
    QUERIES: {
        
    },
    MUTATIONS: {
    }
}
