// import bcryptjs from 'bcryptjs';
// import User from '$models/User';

// export const returnAllUsers = async (User) => {
// 	const Users = await User.find().toArray();
// 	//console.log("Result",Users);
// 	return Users;
// };

// export const returnURLsList = async (User) => {
// 	const projection = { URL: 1, _id: 0 };
// 	const users = await User.find().project(projection).toArray();
// 	const userList = users.map((user) => user.URL);
// 	return userList.sort();
// };

// export const returnEmailsList = async (User) => {
// 	const projection = { email: 1, _id: 0 };
// 	const users = await User.find().project(projection).toArray();
// 	const emailList = users.map((user) => user.email.toString());
// 	return emailList;
// };

// export const registerUser = async (User, user) => {
// 	const register = await User.insertOne(user);
// 	return register;
// };

// export const bulkAddUsers = async (User, users) => {
// 	const register = await User.insertMany(users);
// 	return register;
// };

// export const deleteAll = async (User) => {
// 	const deleteMany = await User.deleteMany();
// 	return deleteMany;
// };

// export const findUserById = async (User) => {
// 	const Users = await User.find().toArray();
// 	//console.log("Result",Users);
// 	return Users;
// };

// export const findUserByUrl = async (_User, url) => {
// 	const User = await User.find({ URL: url }).toArray();
// 	//console.log("Result",User[0]);
// 	return JSON.parse(
// 		JSON.stringify(User[0], (key, value) => (key === '_id' ? value.toString(value) : value))
// 	);
// };

// export const findUserByEmail = async (_User, email) => {
// 	const projection = { email: 1, firstName: 1, _id: 0 };
// 	const User = await User.find({ email: email }).project(projection).toArray();
// 	//console.log("Email Find Result",User[0]);
// 	return JSON.parse(
// 		JSON.stringify(User[0], (key, value) => (key === '_id' ? value.toString(value) : value))
// 	);
// };

// export const findUserByEmailWithPassword = async (User, email) => {
// 	const projection = { email: 1, _id: 0, password: 1, URL: 1, resetTimer: 1 };
// 	const User = await User.find({ email: email }).project(projection).toArray();
// 	//console.log("Email Find Result",User[0]);
// 	return JSON.parse(
// 		JSON.stringify(User[0], (key, value) => (key === '_id' ? value.toString(value) : value))
// 	);
// };

// export const updateUserAdminOptions = async (User, user) => {
// 	const result = await User.findOneAndUpdate(
// 		{ email: user.email },
// 		{ $set: { options: user.options, palette: user.palette } }
// 	);
// 	return result;
// };

// export const updateUserPassword = async (User, user) => {
// 	const result = await User.findOneAndUpdate(
// 		{ email: user.email },
// 		{ $set: { resetToken: undefined, password: user.password } }
// 	);
// 	return result;
// };

// export const setResetToken = async (User, user) => {
// 	const result = await User.findOneAndUpdate(
// 		{ email: user.email },
// 		{ $set: { resetTimer: user.resetTimer } }
// 	);
// 	return result;
// };

// export const CheckUserStyledPage = (url) => {
// 	const nonUserStyledRoutes = ['', '/', '/signup', '/login', 'resetPassword'];
// 	return !nonUserStyledRoutes.includes(url);
// };

// export const registerFormToUserWithoutId = async (form) => {
// 	const hashedPassword = await bcryptjs.hash(form.password, 12);
// 	const user = {
// 		URL: form.urlChoice,
// 		firstName: form.firstName.toString(),
// 		lastName: form.lastName.toString(),
// 		email: form.email.toString(),
// 		password: hashedPassword,
// 		resetTimer: null,
// 		options: {
// 			layout: 'top',
// 			carousel: false,
// 			hero: false,
// 			message: ''
// 		},
// 		palette: {
// 			primary: '#242424',
// 			secondary: '#FFFFFF',
// 			text: '#FFFFFF'
// 		},
// 		photos: []
// 	};

// 	return user;
// };
