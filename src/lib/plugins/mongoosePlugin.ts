import mongoose from 'mongoose';

// Create a global plugin that will be applied to all schemas
const globalSchemaPlugin = (schema: mongoose.Schema) => {
	// Pre-save middleware
	schema.pre('save', function (next) {
		console.log(`Saving document in ${this.constructor.modelName}:`, this);
		next();
	});

	// Pre-update middleware
	schema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
		console.log(`Updating document in ${this.model.modelName}:`, this.getUpdate());
		next();
	});

	// Pre-delete middleware
	schema.pre(['deleteOne', 'findOneAndDelete'], function (next) {
		console.log(`Deleting document in ${this.model.modelName}`);
		next();
	});

	// Pre-create collection middleware
	schema.pre('createCollection', function (next) {
		console.log(`Creating collection for ${this.modelName}`);
		next();
	});

	// Pre-validate middleware
	schema.pre('validate', function (next) {
		console.log(`Validating document in ${this.constructor.modelName}:`, this);
		next();
	});

	// Pre-save middleware for subdocuments
	schema.pre('save', function (next) {
		if (this.isSubdocument) {
			console.log(`Saving subdocument in ${this.constructor.modelName}:`, this);
		}
		next();
	});

	// Pre-validate middleware for subdocuments
	schema.pre('validate', function (next) {
		if (this.isSubdocument) {
			console.log(`Validating subdocument in ${this.constructor.modelName}:`, this);
		}
		next();
	});

	// Middleware for array subdocuments
	schema.pre(['push', 'addToSet', 'pull', 'pullAll'], function (next) {
		console.log(`Modifying array in ${this.constructor.modelName}:`, this);
		next();
	});
};

// Apply the plugin globally to all schemas
mongoose.plugin(globalSchemaPlugin);

// Export the plugin in case it needs to be used individually
export { globalSchemaPlugin };
