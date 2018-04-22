'use strict';

const fetch = require('node-fetch');
const api_host = 'https://api.meetup.com';
var api_method = '/find/upcoming_events';
var api_args = '?photo-host=public&page=20';
var api_sig_id = '&sig_id=248974989';
var api_sig = '&sig=291d274d6e242d5ae394b1df9165f3503724013d';

exports = module.exports = main;

function main(bot) {
  bot.command('/meetup', ctx => meetup(ctx));
}

function meetup(ctx) {
  let reply = '';
  fetch(api_host + api_method + api_args + api_sig_id + api_sig)
    .then(res => res.json())
    .then(function(meetups) {
      for (let meetup of meetups.events) {
        reply += `[${meetup.local_date}] <a href="${meetup.link}">${meetup.name}</a>\n\n`;
      }
      ctx.reply(reply, {'parse_mode': 'html'});
    }).catch(err => console.log(err));
}
