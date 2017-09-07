// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'development',
	PORT: process.env.PORT || 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'student',
	DBPASSWORD: '100AppleJuice',
	DBHOST: 'ds062448.mlab.com:62448',
	DBNAME: 'tattoo-me',
	SERVERNAME: 'dev-server',
	// cloud_name: 'tattoo-me',
	// api_key: '721159567314847',
	// api_secret: '0Pwe5bkv0figlWHZGPW8Nw07xTI'
}

// MAPS env TO ACTUAL ENVIRONMENT
Object.keys(env).forEach(v => {
	process.env[v] = process.env[v] || env[v]
})

//Cloudinary Url
// env.CLOUDINARY = `CLOUDINARY_URL=cloudinary://${env.api_key}:${env.api_secret}@${env.cloud_name}`

// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env