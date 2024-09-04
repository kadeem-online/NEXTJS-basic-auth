import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
} from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: number;
	declare name: string;
	declare email: string;
	declare password: string;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
}

/**
 * Initialize the User model for use alongside a sequelize instance.
 *
 * @param sequelize_instance {Sequelize} - The instance of sequelize to run this
 * create this model on.
 */
function initializeUserModel(sequelize_instance: Sequelize) {
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize: sequelize_instance,
			tableName: "users",
			timestamps: true,
		}
	);
}

export { User as default, initializeUserModel };
