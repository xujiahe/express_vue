var schedule = require("node-schedule");
var fs = require('fs');
import moment from 'moment'

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, 2, 3, 4, 5, 6, 7]; //每周周日晚上
rule.hour = 23; //23：59
rule.minute = 59 //
const uploadFolder = 'uploads/'; //上传文件的临时存放目录

function deleteUploads() { //删除上传的临时目录
  console.log(moment().format('YYYY-MM-DD HH:mm'), "开始执行定时任务");
  if (fs.existsSync(uploadFolder)) {
    let files = fs.readdirSync(uploadFolder);
    files.forEach(function(file, index) {
      var curPath = uploadFolder + "/" + file;
      console.log("删除文件", file);
      fs.unlinkSync(curPath, function(err) {
        if (err) throw err;
      });
    })
    console.log(moment().format('YYYY-MM-DD HH:mm'), "定时任务结束");
  }
}
export const uploadJobs = function() {
  schedule.scheduleJob(rule, function() {
    deleteUploads()
  });
}