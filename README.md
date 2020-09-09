# Buck Net

A crypto financial dashboard pulling updated data from Binance API

### [oddscenes.com/lab/crypto-dashboard](https://oddscenes.com/lab/crypto-dashboard)

&nbsp;&nbsp;

<img src="https://oddscenes.s3.amazonaws.com/screenshot-buck-net.png" width="500" />

&nbsp;&nbsp;

## Usage
- Dev: `npm run dev`
- Build: `npm run build`
- Prod: `npm start`
- Server Only: `npm run server`
- Stop: `npm run stop`

### Dependencies
- NextJS
- NodeJS/Express
- Redis
- Recharts/D3
- Binance API
- Coin Market Cap API

# Installation
`npm i` (maybe -f on unix)

`npm run build`

`npm start`

# Troubleshoot Redis (on server)
- Ensure Redis is running before `npm start`

`apt-get update`

`apt-get install redis-server`

`redis-server`

Check: `service redis-server status`

**Setup Ports**

`cd /etc/redis`

`service redis-server restart`
