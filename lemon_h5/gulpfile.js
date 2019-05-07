var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");
gulp.task("sass", function() {
    return gulp.src("./css/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./css/mui/'))
})
gulp.task("webserver", function() {
    return gulp.src("./")
        .pipe(webserver({
            open: true,
            port: 9093,
            livereload: true,
            proxies: [{
                    "source": "/api/selectBill",
                    "target": "http://localhost:3000/bill/api/selectBill"
                }, {
                    "source": "/api/deleteBill",
                    "target": "http://localhost:3000/bill/api/deleteBill"
                },
                {
                    "source": "/api/addBill",
                    "target": "http://localhost:3000/bill/api/addBill"
                }, {
                    "source": "/api/getClassify",
                    "target": "http://localhost:3000/classify/api/getClassify"
                }, {
                    "source": "/api/iconlist",
                    "target": "http://localhost:3000/icon/api/iconlist"
                },
                {
                    "source": "/api/addClassify",
                    "target": "http://localhost:3000/classify/api/addClassify"
                }
            ]

        }))
})
gulp.task("watch", function() {
    return gulp.watch("./css/sass/*.scss", gulp.series("sass"))
})
gulp.task("dev", gulp.series("sass", "webserver", "watch"))