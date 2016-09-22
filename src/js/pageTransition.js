var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');

module.exports = Barba.BaseTransition.extend({
    start: function(){
        Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
    },

    fadeOut: function(){
        return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    fadeIn: function(){
        var _this = this;
        var $el = $(this.newContainer);

        $('body').removeClass().addClass($el.data('class'));

        $(this.oldContainer).hide();

        $el.css({
            visibility : 'visible',
            opacity : 0
        }).animate({ opacity: 1 }, 400, function(){
            _this.done();
        });
    }
});
