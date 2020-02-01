if (window.location.pathname === '/demo/') {
  const account_id = urlParams.get('account_id')
  (function () {
    window.onload = function () {
      const FrameElem = window.customElements.get('x-frame-bypass')
      const frame = new FrameElem()
      const urlParams = new URLSearchParams(window.location.search)
      frame.account_id = account_id
      frame.src = 'https://' + urlParams.get('site')
      frame.id = 'answerbot-iframe'
      frame.style.position = 'absolute'
      frame.style.left = '0px'
      frame.style.border = 'none'
      frame.style.width = '100%'
      frame.style.height = '100%'
      document.body.appendChild(frame)
    }
  })()
}
