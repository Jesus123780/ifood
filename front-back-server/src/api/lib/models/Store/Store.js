const Sequelize = require('sequelize')
const connect = require('../../db')
const { enCode } = require('../../utils/util')
const CatStore = require('../information/CategorieStore')
const CitiesModel = require('../information/CitiesModel')
const CountriesModel = require('../information/CountriesModel')
const DepartmentsModel = require('../information/DepartmentsModel')
const Users = require('../Users')
const sequelize = connect()

// sequelize.sync()
sequelize.sync()

const Store = sequelize.define('store', {
    idStore: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) {return enCode(this.getDataValue(x))}
    },
    // Locations
    cId: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: CountriesModel,
            key: 'cId'
        },
        get(x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    id: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        unique: true,
        references: {
            model: Users,
            key: 'id'
        },
        get(x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    dId: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: DepartmentsModel,
            key: 'dId'
        },
        get(x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    ctId: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: CitiesModel,
            key: 'ctId'
        },
        get(x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    catStore: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: CatStore,
            key: 'catStore'
        },
        get(x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    neighborhoodStore: {
        type: Sequelize.STRING,
        require: true
    },
    Viaprincipal: {
        type: Sequelize.STRING,
        require: true
    },
    secVia: {
        type: Sequelize.STRING,
        require: false
    },
    storeOwner: {
        type: Sequelize.STRING,
        require: true
    },
    storeName: {
        type: Sequelize.STRING,
        require: true
    },
    emailStore: {
        type: Sequelize.STRING,
        require: true,
        trim: true,
        unique: true
    },
    storePhone: {
        type: Sequelize.STRING,
        require: true,
        trim: true
    },
    socialRaz: {
        type: Sequelize.STRING,
    },
    Image: {
        type: Sequelize.STRING,
        trim: true
    },
    ImageName: {
        type: Sequelize.STRING,
        trim: true
    },
    banner: {
        type: Sequelize.STRING,
        trim: true
    },
    documentIdentifier: {
        type: Sequelize.STRING,
        trim: true
    },
    uPhoNum: {
        type: Sequelize.STRING(50)
    },
    ULocation: {
        type: Sequelize.STRING(100)
    },
    upLat: {
        type: Sequelize.STRING(30)
    },
    upLon: {
        type: Sequelize.STRING(30)
    },
    uState: {
        type: Sequelize.INTEGER(30)
    },
    siteWeb: {
        type: Sequelize.STRING,
        trim: true
    },
    description: {
        type: Sequelize.STRING,
        trim: true
    },
    NitStore: {
        type: Sequelize.STRING,
        trim: true
    },
    typeRegiments: {
        type: Sequelize.STRING,
        trim: true
    },
    typeContribute: {
        type: Sequelize.STRING,
        trim: true
    },
    addressStore: {
        type: Sequelize.STRING,
        trim: true
    },
    createAt: {
        type: Sequelize.DATE,
        default: Date.now()
    }

})

module.exports = Store