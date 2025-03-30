
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/polyfills.I3JIKAFZ.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/app.Wu6Zd8a3.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/page-Information.DRIXb8qq.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/ButtonWithRegisterWebPixel.DutTsBG0.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/NoAddressLocationFullDetour.B73ylG_l.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/DeliveryMethodSelectorSection.DlmLMr8-.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/useEditorShopPayNavigation.BNL5vHKu.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/VaultedPayment.z5_Wn4AB.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/assets/app.BQ2LSWQh.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/assets/ButtonWithRegisterWebPixel.9MjAB40w.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/assets/NoAddressLocationFullDetour.CpG-8YkX.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/assets/DeliveryMethodSelectorSection.DmqjTkNB.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/assets/useEditorShopPayNavigation.DCOTvxC3.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.pt-BR/assets/VaultedPayment.OxMVm7u-.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0846/3741/7789/files/sofanacaixa_favicon_Logo_x320.png?v=1704808913"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  