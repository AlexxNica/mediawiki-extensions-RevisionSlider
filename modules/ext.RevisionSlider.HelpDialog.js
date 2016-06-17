( function ( mw, $ ) {
	// JSHint does not like OOJS' usage of "static" and "super"
	/*jshint -W024 */

	var HelpDialog = function ( config ) {
		HelpDialog.super.call( this, config );
	};

	OO.inheritClass( HelpDialog, OO.ui.ProcessDialog );

	HelpDialog.static.title = mw.msg( 'revisionslider-tutorial' );
	HelpDialog.static.actions = [
		{
			action: 'next',
			label: mw.msg( 'revisionslider-next-dialog' ),
			flags: [ 'primary', 'progressive' ],
			modes: [ 'initial', 'middle' ]
		},
		{ action: 'previous', flags: 'safe', label: mw.msg( 'revisionslider-previous-dialog' ), modes: [ 'middle', 'last' ] },
		{ label: mw.msg( 'revisionslider-close-dialog' ), flags: 'safe', modes: 'initial' },
		{ label: mw.msg( 'revisionslider-close-dialog' ), flags: 'primary', modes: 'last' }
	];

	$.extend( HelpDialog.prototype, {
		slides: [],
		slidePointer: 0,

		initialize: function () {
			HelpDialog.super.prototype.initialize.call( this );

			this.slides = [ this.getSlide1(), this.getSlide2(), this.getSlide3(), this.getSlide4() ];

			this.stackLayout = new OO.ui.StackLayout( {
				items: this.slides
			} );

			this.$body.append( this.stackLayout.$element );
		},

		getSlide1: function () {
			var slide = new OO.ui.PanelLayout( { $: this.$, padded: true, expanded: false } );

			slide.$element
				.append(
					$( '<div>' ).addClass( 'mw-help-dialog-image-landscape mw-help-dialog-slide-1' )
				)
				.append(
					$( '<p>' ).addClass( 'mw-help-dialog-text' )
						.html( mw.message( 'revisionslider-help-dialog-slide1' ).parse() )
				);

			return slide;
		},

		getSlide2: function () {
			var slide = new OO.ui.PanelLayout( { $: this.$, padded: true, expanded: false } );

			slide.$element
				.append( $( '<div>' ).addClass( 'mw-help-dialog-image-landscape mw-help-dialog-slide-2' ) )
				.append(
					$( '<p>' ).addClass( 'mw-help-dialog-text' )
						.text( mw.msg( 'revisionslider-help-dialog-slide2' ) )
				);

			return slide;
		},

		getSlide3: function () {
			var slide = new OO.ui.PanelLayout( { $: this.$, padded: true, expanded: false } );

			slide.$element
				.append( $( '<div>' ).addClass( 'mw-help-dialog-image-portrait mw-help-dialog-slide-3 mw-image-column' ) )
				.append(
					$( '<div>' ).addClass( 'mw-text-column mw-help-dialog-text' )
						.html( mw.message( 'revisionslider-help-dialog-slide3' ).parse() )
				)
				.append( $( '<div>' ).css( 'clear', 'both' ) );

			return slide;
		},

		getSlide4: function () {
			var slide = new OO.ui.PanelLayout( { $: this.$, padded: true, expanded: false } );

			slide.$element
				.append( $( '<div>' ).addClass( 'mw-help-dialog-image-landscape mw-help-dialog-slide-4' ) )
				.append(
					$( '<p>' ).addClass( 'mw-help-dialog-text' )
						.text( mw.msg( 'revisionslider-help-dialog-slide4' ) )
				);

			return slide;
		},

		getActionProcess: function ( action ) {
			if ( action === 'next' ) {
				this.stackLayout.setItem( this.slides[ ++this.slidePointer ] );
			} else if ( action === 'previous' ) {
				this.stackLayout.setItem( this.slides[ --this.slidePointer ] );
			}

			if ( this.slidePointer === 0 ) {
				this.actions.setMode( 'initial' );
			} else if ( this.slidePointer === this.slides.length - 1 ) {
				this.actions.setMode( 'last' );
			} else {
				this.actions.setMode( 'middle' );
			}

			this.stackLayout.$element.closest( '.oo-ui-window-frame' ).css( 'height', this.getContentHeight() + 'px' );
			return HelpDialog.super.prototype.getActionProcess.call( this, action );
		},

		getSetupProcess: function ( data ) {
			return HelpDialog.super.prototype.getSetupProcess.call( this, data )
				.next( function () {
					this.actions.setMode( 'initial' );
				}, this );
		},

		/**
		 * Needed to set the initial height of the dialog
		 *
		 * @return {int}
		 */
		getBodyHeight: function () {
			return this.slides[ this.slidePointer ].$element.outerHeight( true );
		}
	} );

	HelpDialog.show = function () {
		var windowManager = new OO.ui.WindowManager(),
			dialogue = new HelpDialog( { size: 'medium' } );

		$( 'body' ).append( windowManager.$element );
		windowManager.addWindows( [ dialogue ] );
		windowManager.openWindow( dialogue );
	};

	mw.libs.revisionSlider = mw.libs.revisionSlider || {};
	mw.libs.revisionSlider.HelpDialog = HelpDialog;
}( mediaWiki, jQuery ) );
