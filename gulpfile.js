const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styleTrafficLights', function() {
  gulp.src('./trafficLights/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./trafficLights/build'));
});

gulp.task('watchTrafficLights', function() {
  gulp.watch('./trafficLights/style.css', ['styleTrafficLights']);
});

gulp.task('styleFibGen', function() {
  gulp.src('./fibGenerator/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./fibGenerator/build'));
});

gulp.task('watchFibGen', function() {
  gulp.watch('./fibGenerator/style.css', ['styleFibGen']);
});
