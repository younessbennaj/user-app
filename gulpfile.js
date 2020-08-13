const gulp = require('gulp');
const { watch } = require('gulp');
const babel = require('gulp-babel');

//Run each time a .js file change
function js(cb) {
    console.log('js file change');
    //Parse our js code in src/ directory and translate JSX into JS (JSX => React Element)
    gulp.src('src/*.js')
        .pipe(babel({
            presets: ["@babel/preset-react"]
        }))
        //Place the output code in the dist/ directory
        .pipe(gulp.dest('dist'))
    cb();
}

function defaultTask(cb) {
    console.log('do some work');
    //Gulp watch all events in .js files in the src/ directory and run js() task
    //ignoreInitial: false => run the js() task on initialization
    watch('src/*.js', { ignoreInitial: false, events: 'all' }, js)
    cb();
}

exports.default = defaultTask;