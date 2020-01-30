(function () {
  const onclick = `
  document.addEventListener('click', e => {
      if (frameElement && document.activeElement && document.activeElement.href) {
          e.preventDefault()
          frameElement.load(document.activeElement.href)
      }
  })`

  const onsubmit = `
  document.addEventListener('submit', e => {
      if (frameElement && document.activeElement && document.activeElement.form && document.activeElement.form.action) {
          e.preventDefault()
          if (document.activeElement.form.method === 'post')
              frameElement.load(document.activeElement.form.action, {method: 'post', body: new FormData(document.activeElement.form)})
          else
              frameElement.load(document.activeElement.form.action + '?' + new URLSearchParams(new FormData(document.activeElement.form)))
      }
  })`

  const loaderStyle = `
  .loader {
      position: absolute;
      top: calc(50% - 25px);
      left: calc(50% - 25px);
      width: 50px;
      height: 50px;
      background-color: #333;
      border-radius: 50%;  
      animation: loader 1s infinite ease-in-out;
  }
  @keyframes loader {
      0% {
      transform: scale(0);
      }
      100% {
      transform: scale(1);
      opacity: 0;
      }
  }`

  const proxies = [
    'https://jsonp.afeld.me/?url=',
    'https://cors-anywhere.herokuapp.com/',
    'https://cors.io/?'
  ]

  const flags = [
    'allow-forms',
    'allow-modals',
    'allow-pointer-lock',
    'allow-popups',
    'allow-popups-to-escape-sandbox',
    'allow-presentation',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation-by-user-activation'
  ]

  const onMessage = function (e) {
    // Dependencies
    function getRGB (str) {
      var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/)
      return match ? {
        red: Number(match[1]),
        green: Number(match[2]),
        blue: Number(match[3])
      } : {}
    }

    var colorNumberToHex = function (rgb) {
      var hex = Number(rgb).toString(16)
      if (hex.length < 2) {
        hex = '0' + hex
      }
      return hex
    }

    var rgbToHex = function (r, g, b) {
      var red = colorNumberToHex(r)
      var green = colorNumberToHex(g)
      var blue = colorNumberToHex(b)
      return '#' + red + green + blue
    }

    function getKeyByValue (object, value) {
      return Object.keys(object).find(key => object[key] === value)
    }

    function getMaxValue (object) {
      return Math.max.apply(null, Object.values(object))
    }

    function incrementKey (object, key, number) {
      object[key] = object[key] ? object[key] + number : number
    }

    function iterAllElems (rootElem, callback) {
      // iterate over all elements
      Array
        .from(rootElem.getElementsByTagName('*'))
        .forEach(childElem => callback(childElem))
    }

    function iterKeys (object, callback) {
      Object
        .keys(object)
        .forEach(key => callback(key))
    }

    function getTopElemColors (root, topk) {
      // Get the top css colors of an html element
      const colors = {}
      const topColors = []

      // Sum up background colors and colors
      iterAllElems(root, elem => {
        const elemStyles = window.getComputedStyle(elem)
        incrementKey(colors, elemStyles.backgroundColor, 20)
        incrementKey(colors, elemStyles.color, 1)
      })

      // Filter where not too white or black
      iterKeys(colors, newColor => {
        const rgb = getRGB(newColor)
        const rgbSum = rgb.red + rgb.green + rgb.blue
        if (rgbSum < 3 || rgbSum > 600) delete colors[newColor]
      })

      // Get topk colors by count
      for (let i = 0; i < topk; i++) {
        if (colors) {
          const topColor = getKeyByValue(colors, getMaxValue(colors))
          if (topColor) {
            const rgb = getRGB(topColor)
            topColors.push(rgbToHex(rgb.red, rgb.green, rgb.blue))
            delete colors[topColor]
          }
        }
      }
      return topColors
    }

    const GET_IFRAME_COLORS = 'GET_IFRAME_COLORS'
    const SET_ANSWERBOT_COLOR = 'SET_ANSWERBOT_COLOR'
    const ACKNOWLEDGE = 'ACKNOWLEDGE'

    try {
      const msg = JSON.parse(e.data)
      const respond = object => e.source.postMessage(JSON.stringify(object), '*')

      switch (msg.type) {
        case GET_IFRAME_COLORS:
          const colors = getTopElemColors(document, 10)
          respond({ type: GET_IFRAME_COLORS, colors })
          break
        case SET_ANSWERBOT_COLOR:
          window.answerbot.actions.setColor(msg.color)
          respond({ type: ACKNOWLEDGE })
          break
      }
    } catch (e) {
      console.log(e)
    }
  }

  class Iframe extends window.HTMLIFrameElement {
    connectedCallback () {
      this.load(this.src)
      this.src = ''
      this.sandbox = '' + this.sandbox || flags.join(' ') // all except allow-top-navigation
    }
    load (url, options) {
      if (!url || !url.startsWith('http')) {
        throw new Error(`X-Frame-Bypass src ${url} does not start with http(s)://`)
      }

      this.srcdoc = `
          <html>
              <head>
                  <style>${loaderStyle}</style>
              </head>
              <body>
                  <div class="loader"></div>
              </body>
          </html>`
      this.fetchProxy(url, options, 0).then(res => res.text()).then(data => {
        if (data) {
          this.srcdoc = data.replace(/<head([^>]*)>/i, `<head$1>
      <base href="${url}">

      <script
          type='text/javascript'
          account="${this.getAttribute('account')}"
          url='${url}'
          src='https://jsdev.answerbot.app'
      ></script>
    <script>
    ${onclick}
      ${onsubmit}
      window.addEventListener('message', ${onMessage}, false)
    </script>`)
        }
      }).catch(e => console.error('Cannot load X-Frame-Bypass:', e))
    }
    fetchProxy (url, options, i) {
      return window.fetch(proxies[i] + url, options)
        .then(res => {
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
          return res
        })
        .catch(error => {
          if (i === proxies.length - 1) throw error
          return this.fetchProxy(url, options, i + 1)
        })
    }
  }

  console.log('adding custom element')
  window.customElements.define('x-frame-bypass', Iframe, { extends: 'iframe' })
})()
