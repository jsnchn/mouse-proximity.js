module.exports = {
  dist: {
    files: [
      'js/**/*',
      'demo/**/*'
    ],
    tasks: ['uglify'],
    options: {
      livereload: {
        host: 'localhost',
        // port: 3000
      }
    }
  }
};