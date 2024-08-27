
// Define the Service model
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const Service = sequelize.define('services', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    organizationid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    validity_period: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    package_type: {
        type: DataTypes.ENUM('Onetime', 'Subscription'),
        allowNull: false
    },
    staff_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    profile_share: {
        type: DataTypes.ENUM('None', 'Specific'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Enabled', 'Disabled'),
        defaultValue: 'Enabled',
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: true,  
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});



module.exports = Service;



Service.add = async (data) => {
    try {
        const query = `
            INSERT INTO services (
                organizationid,
                service_name,
                description,
                price,
                validity_period,
                package_type,
                staff_id,
                profile_share,
                status,
                created_at,
                updated_at
            ) VALUES (
                ${sequelize.escape(data.organizationid)},
                ${sequelize.escape(data.service_name)},
                ${sequelize.escape(data.description)},
                ${sequelize.escape(data.price)},
                ${sequelize.escape(data.validity_period)},
                ${sequelize.escape(data.package_type)},
                ${sequelize.escape(data.staff_id)},
                ${sequelize.escape(data.profile_share)},
                ${sequelize.escape(data.status || 'Enabled')},
                CURRENT_TIMESTAMP,  -- Add this line
                CURRENT_TIMESTAMP   -- Add this line
            )
        `;

        console.log('Executing query:', query); 
        await sequelize.query(query);
        return { status: '200', message: 'Service added successfully!' };
    } catch (error) {
        console.error("Error while adding service: ", error);
        throw new Error(error.message || "Some error occurred while adding the service.");
    }
};

Service.listAll = async () => {
    try {
        
        const services = await Service.findAll();
        return services;
    } catch (error) {
        console.error("Error while listing services: ", error);
        throw new Error(error.message || "Some error occurred while listing services.");
    }
};



sequelize.sync();


module.exports = Service;
