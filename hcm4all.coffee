class Model
  constructor: (@attributes) ->
    @init()

  init: ->

  get: (name) ->
    @attributes[name]

class Collection
  constructor: ->
    @models = []
    @init()

  init: ->

  fetch: (options = {})->
    options.parse = true if options.parse is undefined
    success = options.success
    collection = @
    options.success = (resp) ->
      method = (if options.reset then "reset" else "set")
      collection[method] resp, options
      success.call options.context, collection, resp, options if success

    $.getJSON @url, options.success.bind(@)

  set: (resp, options) ->
    for attributes in resp
      @models.push new @model(attributes)
    return

class Job extends Model

class Jobs extends Collection
  model: Job
  url: 'http://bode.local.hcm4all.de:8080/api/v1/positions'

class Position extends Model
  init: ->
    if Array.isArray @attributes['jobs']
      jobs = @attributes['jobs']
      @attributes.jobs = new Jobs()
      @attributes.jobs.set jobs

class Positions extends Collection
  model: Position
  url: 'http://bode.local.hcm4all.de:8080/api/v1/positions'

@HCM =
  Position: Position
  Positions: Positions
