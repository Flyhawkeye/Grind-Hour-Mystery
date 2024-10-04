module.exports = {
token: process.env.DISCORD_TOKEN,
channelId: '1290762265943085066',
drawingInterval: 2 * 60 * 1000,
drawingDuration: 10 * 60 * 1000,
ballCount: 100,
winnerCount: 1,
currency: '$',
prizeAmount: process.env.PRIZE_AMOUNT,
database: {
url: process.env.DATABASE_URL,
dbName: 'ballDrawingBot',
},
};