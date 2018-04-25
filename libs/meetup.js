'use strict';

const fetch = require('node-fetch');
const api_host = 'https://api.meetup.com';
var api_method = '/find/upcoming_events';
var api_args = '?photo-host=public&page=15&order=time&topic_category=292';
var api_key = '&key=' + process.env.API_KEY_MEETUP;

exports = module.exports = main;

function main(bot) {
  bot.command(['/meetup', 'meetup', '/meetup@AlberstinBot', 'meetup@AlberstinBot'], ctx => meetup(ctx));
}

function meetup(ctx) {
  let reply = '';
  fetch(api_host + api_method + api_args + api_key + '&sign=true')
    .then(res => res.json())
    .then(function (meetups) {
      for (let meetup of meetups.events) {
        reply += `[${meetup.local_date}] <a href="${meetup.link}">${meetup.name}</a>\n\n`;
      }
      ctx.reply(reply, { 'parse_mode': 'html' });
    }).catch(err => console.log(err));
}
