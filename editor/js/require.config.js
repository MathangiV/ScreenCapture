var require = {
  paths: {
    i18n: "../../libs/i18n",
    "underscore.raw": "../../libs/underscore",
    underscore: "../../libs/underscore.amd",
    eventify: "../../libs/eventify",
    jundo: "../../libs/jundo",
    simplify: "../../libs/simplify",
    sjcl: "../../libs/sjcl",
    handlebars: "../../libs/handlebars",
    spin: "../../libs/spin",
    Filter: "../../libs/Filter",
    BoxBlurFilter: "../../libs/BoxBlurFilter",
    easeljs: "../../libs/easeljs",
    jquery: "../../libs/jquery",
    "jquery.cookie": "../../libs/jquery.cookie",
    "jquery.lightbox_me": "../../libs/jquery.lightbox_me",
    "jquery.editable": "../../libs/jquery.editable",
    "jquery.dragsort": "../../libs/jquery.dragsort",
    yajc: "../../libs/yajc",
    bootstrap: "../../libs/bootstrap",
    "bootstrap-modal": "../../libs/bootstrap-modal",
    "bootstrap-modalmanager": "../../libs/bootstrap-modalmanager",
    browserdetector: "browserdetector",
    dateformatter: "../../libs/dateformatter",
    keymaster: "../../libs/keymaster"
  },
  shim: {
    handlebars: { exports: "Handlebars" },
    BoxBlurFilter: { deps: ["Filter"] },
    easeljs: { deps: ["BoxBlurFilter"] },
    jundo: { deps: ["eventify"] },
    "jquery.cookie": { deps: ["jquery"] },
    "jquery.lightbox_me": { deps: ["jquery"] },
    "jquery.editable": { deps: ["jquery"] },
    "jquery.dragsort": { deps: ["jquery"] },
    yajc: { deps: ["jquery"] },
    bootstrap: { deps: ["jquery"] },
    "bootstrap-modal": { deps: ["bootstrap"] },
    "bootstrap-modalmanager": { deps: ["bootstrap-modal"] },
    qsnap: {
      deps: [
        "underscore",
        "easeljs",
        "sjcl",
        "handlebars",
        "simplify",
        "eventify",
        "jundo",
        "spin",
        "jquery",
        "jquery.lightbox_me",
        "yajc",
        "jquery.editable",
        "jquery.dragsort",
        "jquery.cookie",
        "bootstrap",
        "bootstrap-modal",
        "bootstrap-modalmanager",
        "keymaster",
        "dateformatter"
      ]
    }
  }
};