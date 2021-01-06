module.exports = {
      plugins: [
            require('precss'),
            require('postcss-calc'),
            require('postcss-nested'),
            require('postcss-import'),
            require('postcss-custom-media'),
            require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
            })
      ]
}