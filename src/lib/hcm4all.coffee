root.HCM4all = noop
class root.HCM4all
  @defaults =
    baseUrl: 'http://demo.hcm4all.de'
    apiVersion: 'v1'

  @config = (options = {}) ->
    @defaults[k] = v for k, v of options
    return

  @baseUrl = -> "#{@defaults.baseUrl}/api/#{@defaults.apiVersion}/"

  @positions = (success, error) ->
    new Positions().fetch(success, error)

  @jobs = (success, error) ->
    new Jobs().fetch(success, error)
