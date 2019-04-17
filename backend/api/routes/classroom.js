const getRoomStatusList = require('../../common/room_status');
const got = require('got');
const qs = require('querystring');
const request = got.extend({
  baseUrl: 'http://202.116.41.201:8080/ClientWeb/pro/ajax/device.aspx',
  json: true
});

// module.exports = async (ctx, next) => {
//
// }

module.exports = async (ctx, next) => {
  if (ctx.params.part === 'lib') {
    const campus = ctx.params.week;
    const now = new Date();
    const timeWindow = 15 * 60 * 1000; // 15min
    const endTime = new Date(now.getTime() + timeWindow);
    const dashSpeartedStr = `${now.getFullYear()}-${(now.getMonth() + 1) > 10 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)}-${now.getDate()}`;
    const roomMap = require('../lib-room-map');
    const rooms = roomMap[campus];
    const roomStatus = await Promise.all(rooms.map(
      async (item) => {
        const queryParm = {
          byType: 'devcls',
          classkind: 8,
          display: 'fp',
          md: 'd',
          room_id: item.roomId,
          purpose: '',
          selectOpenAty: '',
          cld_name: 'default',
          date: dashSpeartedStr,
          fr_start: now.toTimeString().substring(0, 5),
          fr_end: endTime.toTimeString().substring(0, 5),
          act: 'get_rsv_sta',
          _: now.getTime()
        };
        const res = await request('/', {
          query: qs.stringify(queryParm)
        });
        return {
          name: item.name,
          total: res.body.data.length,
          empty: res.body.data.filter((i) => { return (i.state !== 'close' && i.freeSta === 0); }).length
        };
      })
    );
    ctx.type = 'application/json';
    ctx.body = {
      lastUpdated: Date.now(),
      data: roomStatus
    };
  } else {
    const week = ctx.params.week || ctx.state.week;
    const day = ctx.params.day || ctx.state.day;
    // console.log(ctx.params.part, ctx.params.week, ctx.params.day)
    // console.log(week, day, ctx.params.part)
    let data = await getRoomStatusList(week, day, ctx.params.part);
    let result = {
      day: [false, '本周一', '本周二', '本周三', '本周四', '本周五', '本周六', '本周日'][day],
      data
    };
    ctx.type = 'application/json';
    ctx.body = (JSON.stringify(result, null, 2));
  }
};
