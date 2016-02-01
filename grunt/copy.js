module.exports = {
  googleSiteVerification: {
    files: [
      // includes files within path
      {expand: true, flatten:true, src: ['js/mouse-proximity.js'], dest: 'dist/js', filter: 'isFile'},
    ],
  },
};