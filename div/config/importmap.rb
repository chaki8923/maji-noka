# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "core", to: "calendar/core.js"
pin "day", to: "calendar/day.js"
pin "interaction", to: "calendar/interaction.js"
pin "list", to: "calendar/list.js"
pin "time", to: "calendar/time.js"
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "jquery", to: "https://ga.jspm.io/npm:jquery@3.6.0/dist/jquery.js"
pin "common", to: "common.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript", preload: true
pin "bootstrap", to: "https://ga.jspm.io/npm:bootstrap@5.2.3/dist/js/bootstrap.esm.js"
pin "@popperjs/core", to: "https://ga.jspm.io/npm:@popperjs/core@2.11.6/lib/index.js"
pin "@hotwired/turbo-rails", to: "turbo.js"
