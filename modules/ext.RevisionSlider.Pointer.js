( function ( mw, $ ) {
	var Pointer = function ( cssClass, offset ) {
		this.view = new mw.libs.revisionSlider.PointerView( this, cssClass, offset );
	};

	$.extend( Pointer.prototype, {
		/**
		 * @type {int}
		 */
		position: 0,

		/**
		 * @type {PointerView}
		 */
		view: null,

		setPosition: function ( p ) {
			this.position = p;
		},

		getPosition: function () {
			return this.position;
		},

		getView: function () {
			return this.view;
		}
	} );

	mw.libs.revisionSlider = mw.libs.revisionSlider || {};
	mw.libs.revisionSlider.Pointer = Pointer;
}( mediaWiki, jQuery ) );
