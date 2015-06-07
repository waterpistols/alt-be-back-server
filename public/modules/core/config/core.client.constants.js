/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
angular.module('core')
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'modernizr':          ['/lib/modernizr/modernizr.js'],
      'icons':              ['/lib/fontawesome/css/font-awesome.min.css',
                             '/lib/simple-line-icons/css/simple-line-icons.css'],
      'datatables':         ['/lib/datatables/media/js/jquery.dataTables.min.js',
                             '/vendor/datatable-bootstrap/css/dataTables.bootstrap.css'],
      'datatables-pugins':  ['/vendor/datatable-bootstrap/js/dataTables.bootstrap.js',
                             '/vendor/datatable-bootstrap/js/dataTables.bootstrapPagination.js',
                             '/lib/datatables-colvis/js/dataTables.colVis.js',
                             '/lib/datatables-colvis/css/dataTables.colVis.css'],
      'morris':             ['/lib/raphael/raphael.js',
                             '/lib/morris.js/morris.js',
                              '/lib/morris.js/morris.css'],
      'inputmask':           ['/lib/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],
      'moment':              ['/lib/moment/min/moment.min.js'],
    },
    // Angular based script (use the right module name)
    modules: [
      {name: 'angularFileUpload',         files: ['/lib/angular-file-upload/angular-file-upload.js']},
      {name: 'monospaced.qrcode',         files: ['/lib/angular-qrcode/qrcode.js']},
      {name: 'qrcode',                    files: ['/lib/bower-qrcode-generator/js/qrcode.js']},
      
    ]

  })
;