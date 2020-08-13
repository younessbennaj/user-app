const { watch } = require('gulp');
const babel = require('gulp-babel');

function js(cb) {
    console.log('js file change');
    cb();
}

function defaultTask(cb) {
    console.log('do some work');
    //Gulp watch all events in .js files in the src/ directory and run js() task
    watch('src/*.js', { events: 'all' }, js)
    cb();
}

exports.default = defaultTask;