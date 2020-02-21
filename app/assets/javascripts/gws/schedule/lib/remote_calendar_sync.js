this.Gws_Schedule_Remote_Calendar_Sync = (function () {
  function Gws_Schedule_Remote_Calendar_Sync(el) {
    this.$el = $(el);
    this.innerHtml = null;
    this.render();
  }

  Gws_Schedule_Remote_Calendar_Sync.message = null;
  Gws_Schedule_Remote_Calendar_Sync.jobStatusPath = null;
  Gws_Schedule_Remote_Calendar_Sync.delay = 5000;

  Gws_Schedule_Remote_Calendar_Sync.render = function() {
    $(".gws-remote-schedule-calendar-sync").each(function() {
      new Gws_Schedule_Remote_Calendar_Sync(this);
    });
  };

  Gws_Schedule_Remote_Calendar_Sync.prototype.render = function() {
    var self = this;
    this.$el.find("button").on("click", function() {
      self.onSync();
    });
  };

  Gws_Schedule_Remote_Calendar_Sync.prototype.onSync = function() {
    if (! confirm(Gws_Schedule_Remote_Calendar_Sync.message)) {
      return;
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
      self.startJobCompletionLoop(data["data"]["job_id"]);
    }).fail(function(xhr, status, error) {
      this.$el.html(status + ": " + error);
    });
  };

  Gws_Schedule_Remote_Calendar_Sync.prototype.startJobCompletionLoop = function(jobId) {
    var self = this;
    $.ajax({
      url: Gws_Schedule_Remote_Calendar_Sync.jobStatusPath.replace(":ID", jobId),
      type: "GET",
      dataType: "json"
    }).done(function(data) {
      // job is still running or standing by
      setTimeout(function() { self.startJobCompletionLoop(jobId); }, Gws_Schedule_Remote_Calendar_Sync.delay);
    }).fail(function(xhr, status, error) {
      // job has been completed
      self.$el.html(self.innerHtml);

      // use setTimeout to give browsers a chance to DOM rendering
      setTimeout(function() {
        if (confirm("同期が完了しました。画面をリロードしてよろしいですか？")) {
          location.reload();
        }
      }, 0);
    });
  };

  return Gws_Schedule_Remote_Calendar_Sync;
})();
