const {src, dest, watch, series} = require('gulp'); //importar funciones de gulp
// CSS y SASS
const sass = require('gulp-sass')(require('sass')); //importar sass y gulp-sass
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
//Imagenes
const imagemin = require('gulp-imagemin')


function css(){
    //pasos para compilar sass
    return src('src/scss/app.scss') // buscar el archivo a compilar
        .pipe(sass()) //compilar el archivo
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css')) // guardar el .css
    
}

function imagenes(){
    return src('src/img/**/*')
    .pipe( imagemin({optimizationLevel: 3}))
    .pipe(dest('build/img'))
}

function dev(){
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);