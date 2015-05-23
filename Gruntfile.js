module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('hcm4all.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    clean: {
      src: ['dist']
    },
    coffeelint: {
      app: ['src/*.coffee']
    },
    coffee: {
      compileJoined: {
        options: {
          join: true
        },
        files: {
          'src/<%= pkg.name %>.js': ['src/lib/base.coffee', 'src/lib/http.coffee', 'src/lib/models.coffee', 'src/lib/hcm4all.coffee', 'src/main.coffee']
        }
      },
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      coffee: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      coffee: {
        files: ['src/main.coffee', 'src/lib/**/*.coffee'],
        tasks: ['coffee']
      },
      concat: {
        files: ['src/<%= pkg.name %>.js'],
        tasks: ['concat']
      },
    },
    karma: {
      once: {
        configFile: 'karma.conf.js',
        singleRun: true,
        autoWatch: false
      },
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Default task.
  // grunt.registerTask('default', ['coffeelint', 'coffee', 'jshint', 'clean', 'concat', 'uglify']);
  grunt.registerTask('default', ['coffeelint', 'coffee', 'clean', 'concat', 'uglify']);

};
