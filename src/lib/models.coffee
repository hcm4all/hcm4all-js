class Model
  constructor: (@attributes, @collection) ->
  get: (name) -> @attributes[name]

class Collection
  model: Model
  constructor: () ->
    # @[k] = v for k, v of options
    @models = []
    @init()
  init: ->
  url: ->
    HCM4all.baseUrl() + @api + "?l=#{HCM4all.defaults.language}"

  add: (attributes) ->
    @models.push new @model(attributes, @)

  fetch: (success, error) ->
    Http.get @url(),
      success: @success.bind(@, success)
      error: @error.bind(@, error)
  success: (callback, response, xhr) ->
    @models = []
    for attributes in response
      @models.push new @model(attributes, @)
    callback.apply(null, [@, response, xhr]) if callback
    return

  error: (callback, xhr)->
    callback.apply(null, [xhr, 'error']) if callback

class Job extends Model
class Jobs extends Collection
  api: 'jobs'
  model: Job

class Position extends Model
class Positions extends Collection
  api: 'positions'
  model: Position
  jobs: ->
    jobs = new Jobs()
    for p in @models
      jobs.add j for j in p.get('jobs')
    jobs
