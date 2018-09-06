const config = require('../config');

exports.getWeek = async (ctx, next) => {
  const now = new Date();
  const base = new Date(config.startDate);
  ctx.state.week = Math.ceil((now.getTime() - base.getTime()) / 1000 / 604800);
  ctx.state.day = now.getDay() || 7;
  await next();
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
  'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-control': 'no-cache'
};

exports.headers = async (ctx, next) => {
  ctx.set(headers);
  await next();
};
