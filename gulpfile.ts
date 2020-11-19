import * as gulp from "gulp";
import * as ts from "gulp-typescript";
import * as sass from "gulp-sass";
import * as sourcemaps from "gulp-sourcemaps";

const tsConfig = ts.createProject("tsconfig.json");



/**
 * Build Sass
 */
const compileTS = function () {
    let tsResult = tsConfig.src().pipe(sourcemaps.init()).pipe(tsConfig()).pipe(sourcemaps.write()).pipe(gulp.dest('module'));
    return tsResult;
}

const compileSass = function () {
    console.log("Rebuilding sass files");
    return gulp.src("styles/**/*.sass").pipe(sass()).pipe(gulp.dest("css"));
}

const watchFiles = function () {
    gulp.watch('styles/**/*.sass', compileSass);
    gulp.watch('ts/**/*.ts', compileTS);
}


gulp.task("watch", gulp.series(compileTS, compileSass, watchFiles));

gulp.task("sass", compileSass);

gulp.task("typescript", compileTS);