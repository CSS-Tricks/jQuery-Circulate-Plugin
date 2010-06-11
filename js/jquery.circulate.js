(function($) {

    $.circulate = function(el, options) {
    
        var base = this,
            origWidth, origHeight, newWidth, origLeft, origTop; 
			
		// FUTURE FEATURE
 		var config = {
		  "1": [ "+=", "+=", "half", true ],
		  "2": [ "+=", "-=", "new", false ],
		  "3": [ "-=", "-=", "half", true ],
		  "4": [ "-=", "+=", "original", false ]
		}
              
        base.$el = $(el);
        base.$el.data("circulate", base);
        
        base.stopAnimation = function() {
            base.options.keepGoing = false;
        }
        
        base.runAnimation = function() {
        
            if (base.options.keepGoing) {
                
                origWidth = base.$el.width();
                origHeight = base.$el.height();
                
                origLeft = base.$el.position().left;
                origTop = base.$el.position().top;
                
                if (base.options.sizeAdjustment == 100) {
                    newWidth = origWidth;
                    newHeight = origHeight;
                    halfWayWidth = origWidth;
                    halfWayHeight = origHeight;
                } else {
                    newWidth = parseInt(origWidth) * (base.options.sizeAdjustment / 100);
                    newHeight = parseInt(origHeight) * (base.options.sizeAdjustment / 100);
                    halfWayWidth = (parseInt(origWidth) + newWidth) / 2;
                    halfWayHeight = (parseInt(origHeight) + newHeight) / 2;
                };
                
                if (base.$el.css("position") != "absolute") {
                    base.$el.css("position", "relative");
                }
                base.$el.css("z-index", base.options.zIndexValues[0]); 
                
                // Would be nice to only start animations if currently unanimated. Like this:
                // base.$el.filter(':not(:animated)').animate({
                // But this is screwing up loops (returns empty set on second go-around)

                base.$el.animate({
                    top: ["+=" + (base.options.height / 2) + "px", 'easeInQuad'],
                    left: ["+=" + (base.options.width / 2) + "px", 'easeOutQuad'],
                    width: [halfWayWidth, 'linear'],
                    height: [halfWayHeight, 'linear'],
                    opacity: 1
                }, base.options.speed, function() { base.$el.css("z-index", base.options.zIndexValues[1]); })
                .animate({
                    top: ["+=" + (base.options.height / 2) + "px", 'easeOutQuad'],
                    left: ["-=" + (base.options.width / 2) + "px", 'easeInQuad'],
                    width: [newWidth, 'linear'],
                    height: [newHeight, 'linear']
                }, base.options.speed, function() { base.$el.css("z-index", base.options.zIndexValues[2]); })
                .animate({
                    top: ["-=" + (base.options.height / 2) + "px", 'easeInQuad'],
                    left: ["-=" + (base.options.width / 2) + "px", 'easeOutQuad'],
                    width: [halfWayWidth, 'linear'],
                    height: [halfWayHeight, 'linear']
                }, base.options.speed, function() { base.$el.css("z-index", base.options.zIndexValues[3]); })
                .animate({
                    top: ["-=" + (base.options.height / 2) + "px", 'easeOutQuad'],
                    left: ["+=" + (base.options.width / 2) + "px", 'easeInQuad'],
                    width: [origWidth, 'linear'],
                    height: [origHeight, 'linear']
                }, base.options.speed, function() {
                
                        base.$el.css("z-index", base.options.zIndexValues[0]);
                                                                
                        if (base.options.loop === true) {
                            base.runAnimation();
                        }
                    
                    });
                
            }

        };
        
        base.init = function() {
                
            base.options = $.extend({},$.circulate.defaultOptions, options);
            
            base.runAnimation();
                        
        };
                
        base.init();
        
    };
    
    $.circulate.defaultOptions = {
        speed: 400,
        height: 200,
        width: 200,
        sizeAdjustment: 100,  // percentage
        loop: false,          // recurrsive?
        zIndexValues: [1, 1, 1, 1],
		range: [1, 4],        // future feature
        keepGoing: true       // internal only
    };
    
    $.fn.circulate = function(options) {
        if (typeof(options) === "string") {
			return this.each(function() { 
			    var safeGuard = $(this).data('circulate');
			    if (safeGuard) { safeGuard.stopAnimation(); }
			});
        } else { 
            return this.each(function() {
                (new $.circulate(this, options));
            });
        } 
    };
    
})(jQuery);