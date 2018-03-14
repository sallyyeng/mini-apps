const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('style', function() {
  gulp.src('./trafficLights/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('style', ['./trafficLights/style.css']);
});
