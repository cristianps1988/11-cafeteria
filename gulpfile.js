const {src, dest, watch, series} = require('gulp'); //importar funciones de gulp
const sass = require('gulp-sass')(require('sass')); //importar sass y gulp-sass
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done){
    //pasos para compilar sass
    src('src/scss/app.scss') // buscar el archivo a compilar
        .pipe(sass()) //compilar el archivo
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css')) // guardar el .css
    done();
}

function dev() {
    watch( 'src/css/**/*.scss', css);
}

exports.css = css;
exports.dev = dev;
exports.default = series( css, dev);