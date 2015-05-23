(function() {
  var Collection, Http, Job, Jobs, Model, Position, Positions, TinyHttp, noop, root,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  root = this;

  noop = function() {};

  TinyHttp = (function() {
    TinyHttp.get = function(url, callbacks) {
      return new this(callbacks).get(url);
    };

    function TinyHttp(callbacks1) {
      this.callbacks = callbacks1;
      this.xhr = this.getHttpRequestObject();
    }

    TinyHttp.prototype.getHttpRequestObject = function() {
      var xhr;
      xhr = false;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
      }
      return xhr;
    };

    TinyHttp.prototype.get = function(url) {
      this.xhr.open('GET', url, true);
      this.xhr.onreadystatechange = this.readyStateChange.bind(this);
      this.xhr.send();
      return this.xhr;
    };

    TinyHttp.prototype.readyStateChange = function() {
      if (this.xhr.readyState === 4) {
        switch (this.xhr.status) {
          case 200:
            return this.callbacks.success(JSON.parse(this.xhr.response), this.xhr);
          case 422:
            return this.callbacks.error(this.xhr);
        }
      }
    };

    return TinyHttp;

  })();

  Http = {};

  if (!(typeof HCM4allTestData === 'undefined')) {
    Http.get = function(url, callbacks) {
      var data;
      data = JSON.parse(HCM4allTestData[url.match(/\/(\w+)$/)[1]]);
      return callbacks.success(data, 'success');
    };
  } else if (typeof jQuery === 'undefined') {
    Http = TinyHttp;
  } else {
    Http.get = function(url, callbacks) {
      return jQuery.getJSON(url, null, callbacks.success).fail(callbacks.error);
    };
  }

  Model = (function() {
    function Model(attributes1, collection) {
      this.attributes = attributes1;
      this.collection = collection;
    }

    Model.prototype.get = function(name) {
      return this.attributes[name];
    };

    return Model;

  })();

  Collection = (function() {
    Collection.prototype.model = Model;

    function Collection() {
      this.models = [];
      this.init();
    }

    Collection.prototype.init = function() {};

    Collection.prototype.url = function() {
      return HCM4all.baseUrl() + this.api;
    };

    Collection.prototype.add = function(attributes) {
      return this.models.push(new this.model(attributes, this));
    };

    Collection.prototype.fetch = function(success, error) {
      return Http.get(this.url(), {
        success: this.success.bind(this, success),
        error: this.error.bind(this, error)
      });
    };

    Collection.prototype.success = function(callback, response, xhr) {
      var attributes, i, len;
      this.models = [];
      for (i = 0, len = response.length; i < len; i++) {
        attributes = response[i];
        this.models.push(new this.model(attributes, this));
      }
      if (callback) {
        callback.apply(null, [this, response, xhr]);
      }
    };

    Collection.prototype.error = function(callback, xhr) {
      if (callback) {
        return callback.apply(null, [xhr, 'error']);
      }
    };

    return Collection;

  })();

  Job = (function(superClass) {
    extend(Job, superClass);

    function Job() {
      return Job.__super__.constructor.apply(this, arguments);
    }

    return Job;

  })(Model);

  Jobs = (function(superClass) {
    extend(Jobs, superClass);

    function Jobs() {
      return Jobs.__super__.constructor.apply(this, arguments);
    }

    Jobs.prototype.api = 'jobs';

    Jobs.prototype.model = Job;

    return Jobs;

  })(Collection);

  Position = (function(superClass) {
    extend(Position, superClass);

    function Position() {
      return Position.__super__.constructor.apply(this, arguments);
    }

    return Position;

  })(Model);

  Positions = (function(superClass) {
    extend(Positions, superClass);

    function Positions() {
      return Positions.__super__.constructor.apply(this, arguments);
    }

    Positions.prototype.api = 'positions';

    Positions.prototype.model = Position;

    Positions.prototype.jobs = function() {
      var i, j, jobs, l, len, len1, p, ref, ref1;
      jobs = new Jobs();
      ref = this.models;
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        ref1 = p.get('jobs');
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          j = ref1[l];
          jobs.add(j);
        }
      }
      return jobs;
    };

    return Positions;

  })(Collection);

  root.HCM4all = noop;

  root.HCM4all = (function() {
    function HCM4all() {}

    HCM4all.defaults = {
      baseUrl: 'http://demo.hcm4all.de',
      apiVersion: 'v1'
    };

    HCM4all.config = function(options) {
      var k, v;
      if (options == null) {
        options = {};
      }
      for (k in options) {
        v = options[k];
        this.defaults[k] = v;
      }
    };

    HCM4all.baseUrl = function() {
      return this.defaults.baseUrl + "/api/" + this.defaults.apiVersion + "/";
    };

    HCM4all.positions = function(success, error) {
      return new Positions().fetch(success, error);
    };

    HCM4all.jobs = function(success, error) {
      return new Jobs().fetch(success, error);
    };

    return HCM4all;

  })();

  root.HCM4all = HCM4all;

}).call(this);
