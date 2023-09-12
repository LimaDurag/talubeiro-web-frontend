module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-react-loader',
              options: {
                // set throwIfNamespace to false
                throwIfNamespace: false,
              },
            },
          ],
        },
      ],
    },
  };