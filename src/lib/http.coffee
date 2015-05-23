class TinyHttp
  @get = (url, callbacks)->
    new @(callbacks).get url

  constructor: (@callbacks) ->
    @xhr = @getHttpRequestObject()

  getHttpRequestObject: ->
    xhr = false
    if window.XMLHttpRequest # Mozilla/Safari/Non-IE
      xhr = new XMLHttpRequest()
    else # IE
      xhr = new ActiveXObject("Microsoft.XMLHTTP") if window.ActiveXObject
    xhr

  get: (url) ->
    @xhr.open 'GET', (url), true
    @xhr.onreadystatechange = @readyStateChange.bind(@)
    @xhr.send()
    @xhr

  readyStateChange: ->
    if @xhr.readyState == 4
      switch @xhr.status
        when 200
          @callbacks.success(JSON.parse(@xhr.response), @xhr)
        when 422
          @callbacks.error(@xhr)

Http = {}
if !(typeof HCM4allTestData == 'undefined')
  Http.get = (url, callbacks) ->
    data = JSON.parse(HCM4allTestData[url.match(/\/(\w+)$/)[1]])
    callbacks.success(data, 'success')
else if (typeof jQuery == 'undefined')
  Http = TinyHttp
else
  Http.get = (url, callbacks) ->
    jQuery.getJSON(url, null, callbacks.success).fail(callbacks.error)


