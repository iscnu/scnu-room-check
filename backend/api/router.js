const getRoomStatusList = require('../common/room_status');
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.type = 'text/html';
  ctx.body = `<h1>API of SCNU Classroom</h1>
<p>Router<span>/:part/:week/:day?</span></p>
<table>
<tr>
    <th>part</th>
    <th>name</th>
</tr>
<tr><td>1</td><td>一课北座</td></tr>
<tr><td>2</td><td>一课南座</td></tr>
<tr><td>3</td><td>一课东、西座</td></tr>
<tr><td>4</td><td>教1栋</td></tr>
<tr><td>5</td><td>教2栋</td></tr>
<tr><td>6</td><td>教3栋</td></tr>
<tr><td>7</td><td>教4栋</td></tr>
<tr><td>8</td><td>教5栋</td></tr>
<tr><td>9</td><td>教6栋</td></tr>
<tr><td>10</td><td>教A栋</td></tr>
<tr><td>11</td><td>教B栋</td></tr>
<tr><td>12</td><td>教C栋</td></tr>
</table>
`;
});

router.get('/:part/:week?/:day?', async (ctx, next) => {
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
});

module.exports = router;
