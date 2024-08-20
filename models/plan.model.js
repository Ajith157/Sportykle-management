const Sequelize = require('sequelize');
const sequelize = require('./sequelize'); 


const Plan = sequelize.define('plans', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    organizationid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    plan_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    batch: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    payment_method: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    day_month_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    registration_fee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    plan_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    status: {
        type: Sequelize.ENUM('enabled', 'disabled'),
        defaultValue: 'enabled',
        allowNull: true
    }
}, {
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});



Plan.add = async (data) => {
    try {
        const query = `
            INSERT INTO plans (
                organizationid,
                plan_name,
                batch,
                payment_method,
                day_month_count,
                registration_fee,
                plan_amount,
                description,
                status,
                created_at,
                updated_at
            ) VALUES (
                ${sequelize.escape(data.organizationid)},
                ${sequelize.escape(data.plan_name)},
                ${sequelize.escape(data.batch)},
                ${sequelize.escape(data.payment_method)},
                ${sequelize.escape(data.day_month_count)},
                ${sequelize.escape(data.registration_fee)},
                ${sequelize.escape(data.plan_amount)},
                ${sequelize.escape(data.description)},
                ${sequelize.escape(data.status || 'enabled')},
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP
            )
        `;

        console.log('Executing query:', query); 
        await sequelize.query(query);
        return { status: '200', message: 'Plan added successfully!' };
    } catch (error) {
        console.error("Error while adding plan: ", error);
        throw new Error(error.message || "Some error occurred while adding the plan.");
    }
};


Plan.listAll = async () => {
    try {
       
        const plans = await Plan.findAll();
        return plans;
    } catch (error) {
        console.error("Error while listing plans: ", error);
        throw new Error(error.message || "Some error occurred while listing plans.");
    }
};



sequelize.sync();

module.exports = Plan;


