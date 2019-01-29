const  gulp=require('gulp');
const uglify=require('gulp-uglify');

gulp.task('minifyjs',function(){
    return gulp.src('srcGulp/*.js')  
        .pipe(uglify())                   
        .pipe(gulp.dest('deskGulp/'))       
 });