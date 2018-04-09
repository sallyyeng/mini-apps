const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styleTrafficLights', function() {
  gulp.src('./trafficLights/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./trafficLights/build'));
});

gulp.task('watchTrafficLights', function() {
  gulp.watch('style', ['./trafficLights/style.css']);
});

gulp.task('styleFibGen', function() {
  gulp.src('./fibGenerator/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./fibGenerator/build'));
});

gulp.task('watchFibGen', function() {
  gulp.watch('style', ['./fibGenerator/style.css']);
});
