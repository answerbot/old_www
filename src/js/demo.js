if (window.location.pathname === '/demo/') {
  (function () {
    window.onload = function () {
      const frame = this.document.createElement('iframe')
      const urlParams = new URLSearchParams(window.location.search)
      frame.account_id = urlParams.get('account_id')
      frame.src = 'https://' + urlParams.get('site')
      frame.setAttribute('is', 'x-frame-bypass')
      frame.id = 'answerbot-iframe'
      frame.style.position = 'absolute'
      frame.style.left = '0px'
      frame.style.border = 'none'
      frame.style.width = '100%'
      frame.style.height = '100%'
      this.document.body.appendChild(frame)
    }
  })()
}
