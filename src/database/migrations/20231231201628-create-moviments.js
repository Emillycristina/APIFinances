'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the 'moviments' table
    await queryInterface.createTable('moviments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.ENUM('entrada', 'saida'),
        allowNull: false
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      valor: {
        type: Sequelize.INTEGER,
        allowNull: false
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
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add a foreign key constraint
    await queryInterface.addConstraint('moviments', {
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

  down: async (queryInterface, Sequelize) => {
    // Drop the 'moviments' table
    await queryInterface.dropTable('moviments');
  }
};
