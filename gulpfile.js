
var fs = require('fs');
var pdf = require('html-pdf');
var fse = require('fs-extra');
var moment = require('moment');
var gulp = require('gulp');
var data = require('gulp-data');
var jade = require('gulp-jade');

var json = {
  staff_name: 'นายสถิตย์  เรียนพิศ',
  staff_position: 'นักวิชาการคอมพิวเตอร์',
  order_date: '31 ตุลาคม พ.ศ. 2558',
  items: [
    {id: 1, product_name: 'ไม้กวาดทางมะพร้าว', unit: 'ด้าม', price: 50, order_qty: 5, approve_qty: 5, totalPrice: 250},
    {id: 2, product_name: 'กระดาษ A4 Double A', unit: 'กล่อง', price: 200, order_qty: 3, approve_qty: 3, totalPrice: 600},
    {id: 3, product_name: 'ตลับหมึกเลเซอร์ HP A40', unit: 'กล่อง', price: '1,350', order_qty: 6, approve_qty: 6, totalPrice: '8,100'},
    {id: 4, product_name: 'ถุงมือ เบอร์ 21', unit: 'กล่อง', price: '80', order_qty: 6, approve_qty: 6, totalPrice: '480'},
    {id: 5, product_name: 'ตะกร้าขนาดใหญ่ สีน้ำเงิน สำหรับใส่ผ้า', unit: 'ผืน', price: '100', order_qty: 5, approve_qty: 4, totalPrice: '400'}
  ]
};

fse.ensureDirSync('./templates/html');
fse.ensureDirSync('./templates/pdf');

var destPath = './templates/html/' + moment().format('x');
fse.ensureDirSync(destPath);

// Create pdf
gulp.task('html', function (cb) {
  return gulp.src('./templates/orders.jade')
    .pipe(data(function () {
      return json;
    }))
    .pipe(jade())
    .pipe(gulp.dest(destPath));
    cb();
});

gulp.task('pdf', ['html'], function () {
  var html = fs.readFileSync(destPath + '/orders.html', 'utf8')
  var options = {
    format: 'A4'
    // footer: {
    //   height: "15mm",
    //   contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
    // }
  };

  var pdfName = './templates/pdf/orders-' + moment().format('x') + '.pdf';

  pdf.create(html, options).toFile(pdfName, function(err, resp) {
    if (err) {
      res.send({ok: false, msg: err});
    } else {
      //rimraf.sync(destPath);
      //fse.removeSync(pdfName);
    }
  });
});

gulp.task('default', ['pdf']);
