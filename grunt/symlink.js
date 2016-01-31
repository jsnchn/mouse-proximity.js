module.exports = {
  dist: {
    options: {
      overwrite: false
    },
    files:[
      {
        expand: true,
        overwrite: false,
        cwd: 'demo',
        src: ['*'],
        dest: 'dist'
      },
    ]
  },
};