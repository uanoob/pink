module.exports = function(grunt) {
  const sass = require("node-sass");
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "source",
            src: ["fonts/**/*.{woff,woff2}", "js/**", "css/**"],
            dest: "build/",
          },
        ],
      },
    },
    clean: {
      build: ["build"],
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      style: {
        files: {
          "build/css/style.css": "source/sass/style.scss",
        },
      },
    },
    postcss: {
      style: {
        options: {
          map: true,
          processors: [require("autoprefixer")()],
        },
        dist: {
          src: "build/css/*.css",
        },
      },
    },
    csso: {
      compress: {
        options: {
          report: "gzip",
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"],
        },
      },
    },
    imagemin: {
      image: {
        options: {
          optimizationLevel: 3,
          progressive: true,
        },
        files: [
          {
            expand: true,
            cwd: "source/img/",
            src: ["**/*.{png,jpg,gif}"],
            dest: "build/img/",
          },
        ],
      },
    },
    svgstore: {
      options: {
        includeTitleElement: false,
      },
      sprite: {
        files: {
          "build/img/sprite.svg": ["source/img/icon-*.svg"],
        },
      },
    },
    posthtml: {
      options: {
        use: [require("posthtml-include")({ root: "./", encoding: "utf-8" })],
      },
      build: {
        files: [
          {
            dot: true,
            cwd: "source/",
            src: ["*.html"],
            dest: "build/",
            expand: true,
          },
        ],
      },
    },
    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml"],
      },
      style: {
        files: ["source/sass/**/*.scss"],
        tasks: ["sass", "postcss", "csso"],
        options: {
          livereload: true,
        },
      },
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ["build/*.html", "build/css/*.css"],
        },
        options: {
          server: "build/",
          watchTask: true,
        },
      },
    },
    stylelint: {
      options: {
        configFile: ".stylelintrc",
        formatter: "string",
        ignoreDisables: false,
        failOnError: true,
        outputFile: "",
        reportNeedlessDisables: false,
        syntax: "",
      },
      all: ["source/sass/**/*.scss"],
    },
  });

  grunt.registerTask("sasslint", ["stylelint"]);
  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "stylelint",
    "sass",
    "postcss",
    "csso",
    "imagemin",
    "svgstore",
    "posthtml",
  ]);
};