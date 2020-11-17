import * as gulp from "gulp";
import * as ts from "gulp-typescript";
import * as sass from "gulp-sass";

const tsConfig = ts.createProject("tsconfig.json");


/**
 * Build Sass
 */
function buildSass() {
    console.log("Rebuilding sass files");
    return gulp.src("styles/*.sass").pipe(sass()).pipe(gulp.dest("css"));
}

function buildWatch() {    
    gulp.watch("styles/**/*.sass", { ignoreInitial: false }, buildSass);
}

gulp.task("watch", buildWatch);