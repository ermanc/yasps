(function() {
  console.log("HEYOOO from Swipely Portal Switcher!");

  var TARGETS = {
    "production": "https://app.upserve.com/",
    "staging": "https://staging-app.upserve.com/",
    "local": "http://localhost:3000/"
  };

  function changeURLTo(url, targetEnv) {
    return url.replace(/^https?:\/\/[^/]+\//, TARGETS[targetEnv]);
  }

  function higlightCurrentMenuEntry() {
    $("div#portal-switcher-menu a").each(function(i, link) {
      var target = $(link).attr("data-env-target");
      var currentURL = window.location.href;
      var newURL = changeURLTo(currentURL, target);

      if (currentURL == newURL) {
        $(link).addClass("current");
      }
    });
  }

  function attachClippyHandlers() {
    $("img#portal-switcher-clippy").click(function(e) {
      updateMenuTargets();
      $("div#portal-switcher-menu").toggle();
      e.stopPropagation();
      e.preventDefault();
      return false;
    });
    $(document.body).click(function(e) {
      $("div#portal-switcher-menu").hide();
    });
  }

  function updateMenuTargets() {
    $("div#portal-switcher-menu a").each(function(i, link) {
      var target = $(link).attr("data-env-target");
      var currentURL = window.location.href;
      var newURL = changeURLTo(currentURL, target);

      $(link).attr("href", newURL);
    });
  }

  function injectClippy() {
    if ($("img#portal-switcher-clippy").length > 0) return;

    var $img = $("<img id='portal-switcher-clippy'>");
    $img.attr("src", chrome.extension.getURL("public/clippy.gif"));
    $(document.body).append($img);
  }

  function injectMenu() {
    if ($("div#portal-switcher-menu").length > 0) return;

    var $menu = $(
      "<div id='portal-switcher-menu'>"+
        "I see you're trying think in portals.<br>Which way you wanna go?"+
        "<ul>"+
          "<li><a href='#' data-env-target='local'>Local</a></li>"+
          "<li><a href='#' data-env-target='staging'>Staging</a></li>"+
          "<li><a href='#' data-env-target='production'>Production</a></li>"+
        "</ul>"+
      "</div>"
    );
    $(document.body).append($menu);
  }

  function setupMenu() {
    injectMenu();
    higlightCurrentMenuEntry();
  }

  function setupClippy() {
    injectClippy();
    attachClippyHandlers();
  }

  setupMenu();
  setupClippy();

})();
