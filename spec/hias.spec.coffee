# Pull in the utility functions we're testing.
util = require '../src/hcm4all.coffee'

describe "A suite", ->
  it "contains spec with an expectation", ->
    expect(util.HCM.oida()).toBe true


