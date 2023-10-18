const Config = {
	mongodb: {
		url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/College-Erp',
	},
    server: {
		port: process.env.PORT || 3000,
		env: process.env.NODE_ENV,
	},
};
export default Config;

