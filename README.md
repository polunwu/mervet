# webpack-starter-rackup

A simple **webpack 4 starter project** for your basic web development needs with rackup.

## Features

* Separated development and production webpack settings you can understand
* Sass
* ES6
* Asset loading
* CSS Vendor prefixing
* Development server
* Sourcemaps
* Favicons generation
* Production optimizations
* Mobile browser header color
* Multi pages structure
* With Rack server

## Requirements

* [Node](https://nodejs.org) > 7.6
* [Ruby](https://www.ruby-lang.org/) 2.6.5

## Usage

Substitute `PROJECT-NAME` for your project name.

Clone the repository

```sh
 git clone https://github.com/polunwu/webpack-starter-rackup PROJECT-NAME
 cd PROJECT-NAME
```

Install npm dependencies

```sh
 npm install 
```

Run the kickstart command
```sh
npm run kickstart
```

**After the project has been kickstarted**

To start the development server

```sh
npm start
```

To build for production

```sh
npm run build
```

To preview the production build
```sh
npm run preview
```

**After the project has been build**

Install Gemfile
```sh
bundle install
```

To start the rack server

```sh
rackup
```