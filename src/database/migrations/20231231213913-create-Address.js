'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomeCompleto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: { // Foreign key column
        type: Sequelize.UUID,
        references: {
          model: 'Users', // Name of the referenced table
          key: 'id' // Primary key of the referenced table
        },
        allowNull: false
      },
       created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('Addresses', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_moviments_user', // Give a name to your foreign key constraint
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade', // Set the appropriate action for onDelete
      onUpdate: 'cascade' // Set the appropriate action for onUpdate
    });
  },

  
  

  down: async (queryInterface) => {
    await queryInterface.dropTable('Addresses');
  },

}
