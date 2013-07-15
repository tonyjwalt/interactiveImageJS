/*
 * IntImg       https://github.com/tonyjwalt/nexcarousel
 * LICENSE      Copyright (c) 2013 Anthony Walt - MIT License
 * Written by:  Tony Walt
 * Notes:       Jquery Widget that currently turns a filmstrip type image into a looping sequence
 *              with potential for an "action" loop as well triggered by an event.
 *              Please feel free to fork it, but I
 *              would greatly appreciate any changes so that I can continue to improve upon this.
 * Requires:    jQuery 1.9+
 * Requires:    jQuery UI 1.8.16+
 */

 // make sure required JavaScript modules are loaded
if (typeof jQuery === "undefined") {
  throw "This widget requires jquery module to be loaded";
}
(function($){
  var IntImg = {
    options: {
      filmStripClass : '',
      controlAttr: 'background-position',
      filmDir: 0, // 0 for horizontal, 1 for vertical
      frameSize: 50, // may want to detect this if not provided.
      filmUnits: 'px', //currently not using this
      frameRate: 30,
      loopStartFrame: 0,
      loopEndFrame: 100, //may want to detect this if not provided
      actionFramesArr: [ 101, 200 ],
      interactive: true,
      automate: true,
      actionFlag: false,
      actionPlayingFlag: false
    },
    //**********************//
    //    PRIVATE METHODS    //
    //**********************//
    _create: function () {
    },
    _init: function() {
      this.timerRate = 1000/this.options.frameRate;
      this.$filmStrip = (this.options.filmStripClass == '') ? this.element : this.element.find(this.options.filmStripClass);
      this.lockedBGVal = this.$filmStrip.css('background-position').split(" ")[ this.options.filmDir ]; // get the static value
      this.loopArr = []; //array to contain lookup values to move playhead - less math
      this.currentFrame = 0; //default the playhead to 0
      this.inita = null; //timer to move playhead
      this._populateFrameArr(this.options.loopStartFrame, this.options.loopEndFrame, this.loopArr);

      this._bindEvents();
      
      if (this.options.interactive) {
        this.actionArr = [];
        this._populateFrameArr(this.options.actionFramesArr[0] , this.options.actionFramesArr[1] , this.actionArr);
        this._bindButtons();
      }

      //if set to automate start the loop
      if (this.options.automate) {
        this.startPlay();
      }
    },
    _bindEvents: function () {
      var self = this;
      this.$filmStrip.on( 'stop', function() {
        window.clearInterval( self.inta );
      } );
    },
    _bindButtons: function () {
      var self = this;
      self.$filmStrip.on( 'mouseenter', function(){
        self.options.actionFlag = true;
      });

      self.$filmStrip.on( 'click', function(){
        $(this).trigger('stop');
      });
    },
    _populateFrameArr : function (start, end, arr) {
      var i = 0,       
          lStart = start,
        lSize = this.options.frameSize,
        arrLen = end - lStart;
      for (; i<arrLen; i++) {
        arr.push( -( (lStart * lSize) + (i * lSize) ) );
      }
    },
    //**********************//
    //    PUBLIC METHODS    //
    //**********************//
    advFrame: function ( v ) {
      var ittr = v || 1, //default the itteration to 1 if it's not defined
        currentArr = ( this.options.actionPlayingFlag ) ? this.actionArr : this.loopArr,
        testVal = this.currentFrame + ittr,
        bgLookupVal, tempVal;
      
      // check to see if we are on the last frame
      if ( testVal >= currentArr.length ) {
        //reset the playhead and the action play flag
        bgLookupVal = 0;
        this.options.actionPlayingFlag = false;
        //check the action flag to determine current array
        if ( this.options.actionFlag ) {
          this.clearActionFlag();
          this.options.actionPlayingFlag = true;
        }
      } else {
        bgLookupVal = testVal;
      }
      
      //advance the playhead based on the bgLookupVal and playhead direction
      if ( this.options.filmDir > 0 ) {
        tempVal =  this.lockedBGVal + ' ' + currentArr[ bgLookupVal ] + 'px';
      } else {
        tempVal = currentArr[ bgLookupVal ] + 'px ' + this.lockedBGVal;
      }
      
      this.$filmStrip.css( "background-position", tempVal );
      this.currentFrame = bgLookupVal;
    },
    stopPlay: function () {
      $(this).trigger('stop');
    },
    startPlay:function ()  {
      var self = this;
      this.inta = window.setInterval( function() {
        //advance to next item when triggered
        self.advFrame();
      }, self.timerRate );
    },
    clearActionFlag: function () {
      this.options.actionFlag = false;
    }
  };

  $.widget( 'ui.intImage', IntImg );
  /**
  * Example
  * $( '#myID' ).intImage();
  **/
})(jQuery);