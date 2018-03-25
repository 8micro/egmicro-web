let getConfig = () => {
    let env = process.env.EGMICRO_ENV || 'dev';
    let configInfo = {
        version: '1.0.0',
        isDebugMode: true,
        listenPort: process.env.EGMICRO_LISTEN_PORT || 8200,
        encryptKey: 'abc@123',
        prest: {
            hostAPI: 'http://120.78.156.20:8085/egmicrodb/public',
            jwtSecret: '8micro_ours',
            jwtExpired: 30
        }
    };
    return configInfo;
}

module.exports = getConfig();