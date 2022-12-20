const {src, dest, watch, series} = require('gulp'); //importar funciones de gulp
// CSS y SASS
const sass = require('gulp-sass')(require('sass')); //importar sass y gulp-sass
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//Imagenes
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(){
    //pasos para compilar sass
    return src('src/scss/app.scss') // buscar el archivo a compilar
        .pipe(sourcemaps.init())
        .pipe(sass()) //compilar el archivo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')) // guardar el .css
    
}

function imagenes(){
    return src('src/img/**/*')
    .pipe( imagemin({optimizationLevel: 3}))
    .pipe(dest('build/img'))
}

function imagenWebp(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
}

function imagenAvif(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
}

function dev(){
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imagenWebp = imagenWebp;
exports.imagenAvif = imagenAvif;
exports.default = series(imagenes, imagenWebp, imagenAvif, css, dev);