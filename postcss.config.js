module.exports = {
      plugins: [
            require('precss'),
            require('postcss-nested'),
            require('postcss-custom-media'),
            require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
            })
      ]
}