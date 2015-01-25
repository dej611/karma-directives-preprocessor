define([], function () {
  "use strict";

  // @ifdef development
  superExpensiveFunction();
  // @endif

  // @ifdef production
  superQuickFunction();
  // @endif

  // @include ./included_file.js
});