(function () {
  window.onload = function () {
    const frame = this.document.getElementById('answerbot-iframe')
    const urlParams = new URLSearchParams(window.location.search)
    frame.account_id = urlParams.get('account_id')
    frame.src = urlParams.get('site')
  }
})()
