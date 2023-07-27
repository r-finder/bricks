const path = require('path');
const PugPlugin = require('pug-plugin');

const PATHS = {
  output: path.join(__dirname, './dist/static/'),
};

const web = (env, argv) => {
  const isDev = argv.mode !== 'production';

  // recovery environment variables from webpack arguments, see in package.json
  process.env.NODE_ENV = argv.mode;
  process.traceDeprecation = isDev;

  return {
    mode: isDev ? 'development' : 'production',
    devtool: 'source-map',

    stats: {
      colors: true,
      preset: 'minimal',
      loggingDebug: ['sass-loader'],
    },

    output: {
      path: PATHS.output,
      publicPath: '/',
    },

    entry: {
      index: './src/client/views/index.pug',
    },

    resolve: {
      alias: {
        '@images': path.join(__dirname, './src/client/images/'),
        '@fonts': path.join(__dirname, './src/client/fonts/'),
        '@scripts': path.join(__dirname, './src/client/scripts/'),
        '@styles': path.join(__dirname, './src/client/styles/'),
        '@views': path.join(__dirname, './src/client/views/'),
      },
    },

    plugins: [
      new PugPlugin({
        js: {
          filename: 'assets/js/[name].[contenthash:8].js',
        },
        css: {
          filename: 'assets/css/[name].[contenthash:8].css',
        },
      }),
    ],

    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            // imports Pug in JavaScript/TypeScript as template function. If you want to use client-side templates
            {
              issuer: /\.(js|ts)$/,
              loader: PugPlugin.loader,
              options: {
                method: 'compile',
              },
            },
            // renders Pug from Webpack entry into static HTML
            {
              loader: PugPlugin.loader,
            },
          ],
        },

        {
          test: /\.(css|sass|scss)$/,
          use: ['css-loader', 'sass-loader'],
        },

        {
          test: /\.(png|jpg|jpeg|svg|ico)$/,
          type: 'asset/resource',
          include: /\/images/,
          generator: {
            filename: 'assets/img/[name].[hash:8][ext][query]',
          },
        },

        {
          test: /\.(woff|woff2|svg|eot|ttf|otf)$/i,
          type: 'asset/resource',
          include: /\/fonts/,
          generator: {
            filename: 'assets/fonts/[name][ext][query]',
          },
        },
      ],
    },
  };
};

module.exports = [web];
