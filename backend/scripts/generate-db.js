const readline = require('readline');
const path = require('path');
const fs = require('fs');
const DB = require('../common/db');
const config = require('../config');

// 星期
const Day = {
  '周一': 1,
  '周二': 2,
  '周三': 3,
  '周四': 4,
  '周五': 5,
  '周六': 6,
  '周日': 7
};

// 专业课上课地点的对应关系
// 正方给的是缩略名，这里转换为完整名字，更美观一些
const Place = {
  '城市文..': '城市文化学院',
  '创新创..': '创新创业学院',
  '大英部..': '大英部',
  '地理科..': '地理科学学院',
  '法学院..': '法学院',
  '公共管..': '公共管理学院',
  '公体部..': '公体部',
  '国际商..': '国际商学院',
  '华南先..': '华南先进光电子研究院',
  '化学与..': '化学与环境学院',
  '计算机..': '计算机学院',
  '教师发..': '教师发展中心',
  '教务处..': '教务处',
  '教学科..': '教学科研办公室',
  '教育科..': '教育科学学院',
  '教育信..': '教育信息技术学院',
  '经济与..': '经济与管理学院',
  '军事理..': '军事理论教研室',
  '历史文..': '历史文化学院',
  '旅游管..': '旅游管理学院',
  '马克思..': '马克思主义学院',
  '美术学..': '美术学院',
  '软件学..': '软件学院',
  '生命科..': '生命科学学院',
  '数学科..': '数学科学学院',
  '体育科..': '体育科学学院',
  '图书馆..': '图书馆',
  '外国语..': '外国语言文化学院',
  '网络教..': '网络教育学院',
  '文学院..': '文学院',
  '物理与..': '物理与电信工程学院',
  '校医院..': '校医院',
  '心理学..': '心理学院',
  '信息光..': '信息光电子科技学院',
  '学生工..': '学生工作部',
  '学生就..': '学生就业指导中心',
  '音乐学..': '音乐学院',
  '政治与..': '政治与行政学院',
  '职业教..': '职业教育学院'
};

// main
(async () => {
  const db = await DB();

  // 初始化表格
  await db.exec(fs.readFileSync(path.join(__dirname, '..', 'data', 'init_tables.sql'), 'utf-8'));
  // 初始化课室数据
  await db.exec(fs.readFileSync(path.join(__dirname, '..', 'data', 'basic_places.sql'), 'utf-8'));

  // 创建插入time表的句柄
  const timeStatement = await db.prepare('INSERT INTO `time` (`course_id`, `day`, `order`) VALUES (?, ?, ?)');
  // 创建插入weeks表的句柄
  const weeksStatement = await db.prepare('INSERT INTO `weeks` (`course_id`, `week`) VALUES (?, ?)');

  let lineReader = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, '..', 'data', config.semester, `${config.semester}.csv`))
  });

  lineReader.on('line', async function (line) {
    // 处理第xx节
    let temp = line.replace(/"(.*?)"/, function (match, p1) {
      return p1.replace(/,/g, '|');
    });
    let columns = temp.split(',');

    // 基本信息
    // let [ code, name, teacher, campus, place, department ] = basicInfo;
    // [ '44C18461-4164-6', '思想道德修养与法律基础', '高维杰', '2', '教C201', '城市文..' ]
    let basicInfo = columns.slice(0, 3).concat(columns.slice(24, 26), Place[columns[26]] || columns[26]);

    // 接下来是节次
    // example: 周一第5|6节
    let _str = columns[3];
    let day = Day[_str.substr(0, 2)];
    let orders = _str.substr(3, _str.length - 4).split('|');

    // 接下来是周次
    let weeks = [];
    columns.slice(4, 23).forEach((element, index) => {
      if (element !== '') {
        weeks.push(index + 1);
      }
    });

    // 写入数据库
    let { lastID } = await db.run('INSERT INTO `courses` (`code`, `name`, `teacher`, `campus`, `place`, `department`) VALUES (?, ?, ?, ?, ?, ?)', basicInfo);
    // 节次
    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      timeStatement.run([lastID, day, order]);
    }
    // 周次
    for (let index = 0; index < weeks.length; index++) {
      const week = weeks[index];
      weeksStatement.run([lastID, week]);
    }

    console.log('finish: ', lastID);
  });
})();
