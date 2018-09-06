const DB = require('./db');

// 获取教室列表
async function getPlaces(part) {
  const db = await DB();
  return await db.all('select * from `places` where `part` = ?', part);
}

// 指定周，日期和地点获取课程
async function getCourseList(week, day, part) {
  const db = await DB();
  const sql = `select *
from \`places\`
left outer join \`courses\`
    on places.place = courses.place
left outer join \`weeks\`
    on weeks.course_id = courses.id
left outer join \`time\`
    on time.course_id = courses.id
where weeks.week = ?
    and time.day = ?
    and places.part = ?
order by places.\`order\` ASC, time.\`order\` ASC`
  return await db.all(sql, [week, day, part]);
}

// 去掉 Key, 将 Object 转换为 Array
function objectToArr(obj) {
  var result = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      result.push(element);
    }
  }
  return result;
}

// 课程区间下标转换
const orderMap = {
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 4,
  10: 4,
  11: 4,
};

// 获得指定列表
async function getRoomStatusList(week, day, part) {
  const placeList = await getPlaces(part);
  let temp = {};
  // 初始化 temp
  placeList.forEach(item => {
    temp[item.place] = {
      name: item.place,
      status: [false, false, false, false, false],
    };
  });
  // 获取具体课程情况
  const courseList = await getCourseList(week, day, part);
  let courseTemp = {};
  // 遍历数据
  courseList.forEach(course => {
    const { campus, place, part, order, id, name, code, teacher, department } = course;
    // 课程代码相同就是同一门课
    if (!courseTemp[code]) {
      courseTemp[code] = {
        id,
        name,
        department,
        campus,
        place,
        part,
        teacher: [teacher],
        order: [order],
      };
    } else {
      // 教师
      if (!courseTemp[code].teacher.includes(teacher)) {
        courseTemp[code].teacher.push(teacher);
      }
      // 节次
      if (!courseTemp[code].order.includes(order)) {
        courseTemp[code].order.push(order);
      }
    }
  });
  courseTemp = objectToArr(courseTemp);
  // console.log(courseTemp);
  courseTemp.forEach(course => {
    let { place } = course;
    course.order.forEach(order => {
    let index = orderMap[order];
      if (!temp[place].status[index]) {
        temp[place].status[index] = course;
      }
    });
  });
  return objectToArr(temp);
}

module.exports = getRoomStatusList;

// main
// (async () => {
//   let result = await getRoomStatusList(1, 1, 1);
//    console.log(JSON.stringify(result, null, 2));
//
//   // console.log(await db.get('SELECT * FROM `courses`'));
//
// })();
