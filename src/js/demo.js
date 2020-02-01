if (window.location.pathname === '/demo/') {
  var urlParams = new URLSearchParams(window.location.search)
  var accountId = urlParams.get('account_id');
  console.log(accountId);
  (function () {
    window.onload = function () {
      const FrameElem = window.customElements.get('x-frame-bypass')
      const frame = new FrameElem()
      frame.account_id = accountId
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
