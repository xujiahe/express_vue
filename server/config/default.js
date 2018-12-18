const fs = require('fs');
module.exports = {
  httpsPort: '443',
  httpPort: process.env.NODEJS_PORT || '80',
  serverIp: process.env.SERVER_IP || '10.231.20.60',
  serverPort: process.env.SERVER_Port || '9091',
  language: process.env.CLIENT_LANGUAGE = 'CH',
  session: {
    name: 'MegviiSID',
    secret: 'MegviiSID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(process.env.SESSION_EXPIRE) || 8 * 60 * 60 * 1000, //session过期时间。单位毫秒 ,默认8小时
    }
  },
  serverOptions: { //HTTPS服务证书
    key: fs.readFileSync('keys/ssl.key', 'utf8'),
    cert: fs.readFileSync('keys/ssl.crt', 'utf8'),
    passphrase: '12345',
    requestCert: false,
    rejectUnauthorized: false
  }
}