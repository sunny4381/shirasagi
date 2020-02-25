this.Gws_Schedule_Remote_Calendar_Sync = (function () {
  function Gws_Schedule_Remote_Calendar_Sync(el) {
    this.$el = $(el);
    this.innerHtml = null;
    this.render();
  }

  Gws_Schedule_Remote_Calendar_Sync.confirmations = {
    sync: null,
    reload: null
  };
  Gws_Schedule_Remote_Calendar_Sync.jobStatusPath = null;
  Gws_Schedule_Remote_Calendar_Sync.delay = 5000;
  Gws_Schedule_Remote_Calendar_Sync.instances = [];
  Gws_Schedule_Remote_Calendar_Sync.jobCompletionLoopCount = 0;

  Gws_Schedule_Remote_Calendar_Sync.render = function() {
    $(".gws-schedule-remote-calendar").each(function() {
      var instance = new Gws_Schedule_Remote_Calendar_Sync(this);
      Gws_Schedule_Remote_Calendar_Sync.instances.push(instance);
    });
  };

  Gws_Schedule_Remote_Calendar_Sync.syncAll = function() {
    $.each(Gws_Schedule_Remote_Calendar_Sync.instances, function() {
      this.onSync({ skipConfirmation: true });
    });
  };

  Gws_Schedule_Remote_Calendar_Sync.prototype.render = function() {
    var self = this;
    this.$el.on("click", "button", function() {
      self.onSync();
    });
  };

  Gws_Schedule_Remote_Calendar_Sync.prototype.onSync = function(options) {
    if (!options || !options.skipConfirmation) {
      if (!confirm(Gws_Schedule_Remote_Calendar_Sync.confirmations.sync)) {
        return;
      }
    }

    if (! this.innerHtml) {
      this.innerHtml = this.$el.html();
    }

    this.$el.html(SS.loading);

    var self = this;
    $.ajax({
      url: this.$el.data("href"),
      type: "POST",
      dataType: "json"
    }).done(function(data) {
      SS.notice(data["data"]["notice"]);

      Gws_Schedule_Remote_Calendar_Sync.jobCompletionLoopCount++;

      var loop = new JobCompletionLoop(data["data"]["job_id"]);
      loop.done(function() {
        // job has been completed
        self.$el.html(self.innerHtml);

        Gws_Schedule_Remote_Calendar_Sync.jobCompletionLoopCount--;
        if (Gws_Schedule_Remote_Calendar_Sync.jobCompletionLoopCount === 0) {
          // use setTimeout to give browsers a chance to DOM rendering
          setTimeout(function() { self.reload(); }, 10);
        }
      });
      loop.start();
    }).fail(function(xhr, status, error) {
      self.$el.html(error);
    });
  };

  Gws_Schedule_Remote_Calendar_Sync.prototype.reload = function() {
    if (!confirm(Gws_Schedule_Remote_Calendar_Sync.confirmations.reload)) {
      return;
    }

    // reload button が存在する場合は、ボタンをクリックする
    var buttons = $(document).find(".fc-reload-button");
    if (buttons.length > 0) {
      buttons[0].click();
      return;
    }

    // reload button が存在しない場合は、全体を再読み込み。
    location.reload();
  };

  function JobCompletionLoop(jobId) {
    this.jobId = jobId;
    this.url = Gws_Schedule_Remote_Calendar_Sync.jobStatusPath.replace(":ID", this.jobId);
    this.defer = $.Deferred();
    this.promise = this.defer.promise();
  }

  JobCompletionLoop.prototype.done = function(f) {
    this.promise.done(f);
  };

  JobCompletionLoop.prototype.start = function(f) {
    var self = this;
    $.ajax({
      url: this.url,
      type: "GET",
      dataType: "json"
    }).done(function(data) {
      // job is still running or standing by
      setTimeout(function() { self.start(); }, Gws_Schedule_Remote_Calendar_Sync.delay);
    }).fail(function(xhr, status, error) {
      self.defer.resolve();
    });
  };

  return Gws_Schedule_Remote_Calendar_Sync;
})();
