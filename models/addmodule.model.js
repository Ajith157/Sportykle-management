// const Sequelize = require('sequelize');
// const sequelize = require('./sequelize'); 
// const organization=require('../models/organization.model')

// const Module = sequelize.define('modules', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     organization_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'organizations',
//             key: 'id'
//         },
//         onDelete: 'CASCADE'
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     module_type: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     centre_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'centres',
//             key: 'id'
//         },
//         onDelete: 'SET NULL'
//     },
//     sports_id: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'sports',
//             key: 'id'
//         },
//         onDelete: 'SET NULL'
//     },
//     mobile: {
//         type: Sequelize.STRING(20),
//         allowNull: false
//     },
//     alternate_number: {
//         type: Sequelize.STRING(20)
//     },
//     address_line1: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     address_line2: {
//         type: Sequelize.STRING
//     },
//     country: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     state: {
//         type: Sequelize.STRING
//     },
//     gst_no: {
//         type: Sequelize.STRING
//     },
//     website: {
//         type: Sequelize.STRING
//     },
//     email_id: {
//         type: Sequelize.STRING
//     },
//     city: {
//         type: Sequelize.STRING
//     },
//     pincode: {
//         type: Sequelize.STRING(10)
//     },
//     use_centre_data_for_invoice: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//     },
//     use_centre_timings: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//     },
//     weekdays_from: {
//         type: Sequelize.TIME
//     },
//     weekdays_to: {
//         type: Sequelize.TIME
//     },
//     saturday_from: {
//         type: Sequelize.TIME
//     },
//     saturday_to: {
//         type: Sequelize.TIME
//     },
//     sunday_from: {
//         type: Sequelize.TIME
//     },
//     sunday_to: {
//         type: Sequelize.TIME
//     },
//     select_days: {
//         type: Sequelize.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
//     },
//     due_date: {
//         type: Sequelize.DATE
//     }
// }, {
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });

// module.exports = Module;


const Sequelize = require('sequelize');
const sequelize = require('./sequelize'); 
const organization = require('../models/organization.model');

const Module = sequelize.define('modules', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    organization_id: {
        type: Sequelize.INTEGER,
        allowNull: false
        
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    module_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    centre_id: {
        type: Sequelize.INTEGER,
        allowNull: false
        // Removed references and onDelete attributes
    },
    sports_id: {
        type: Sequelize.INTEGER
        // Removed references and onDelete attributes
    },
    mobile: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    alternate_number: {
        type: Sequelize.STRING(20)
    },
    address_line1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_line2: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING
    },
    gst_no: {
        type: Sequelize.STRING
    },
    website: {
        type: Sequelize.STRING
    },
    email_id: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    pincode: {
        type: Sequelize.STRING(10)
    },
    use_centre_data_for_invoice: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    use_centre_timings: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    weekdays_from: {
        type: Sequelize.TIME
    },
    weekdays_to: {
        type: Sequelize.TIME
    },
    saturday_from: {
        type: Sequelize.TIME
    },
    saturday_to: {
        type: Sequelize.TIME
    },
    sunday_from: {
        type: Sequelize.TIME
    },
    sunday_to: {
        type: Sequelize.TIME
    },
    select_days: {
        type: Sequelize.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
    },
    due_date: {
        type: Sequelize.DATE
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Module;
