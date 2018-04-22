require('dotenv').config()

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

express().listen(PORT, () => console.log(`Listening on ${PORT}`))

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'))

require('./libs/meetup')(bot)

bot.startPolling()
