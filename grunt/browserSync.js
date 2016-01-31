module.exports = {
  demo: {
    files: {
      src : [
        'dist/**/*',
      ]
    },
    options: {
      host: 'pc.localhost',
      port:3001,
      watchTask: true,
      ghostMode: {
        clicks: true,
        scroll: true,
        links: false,
        forms: true
      },
      server: {
        baseDir: 'dist'
      }
    }
  }
};