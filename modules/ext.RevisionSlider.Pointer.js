( function ( mw, $ ) {
	/**
	 * Module containing logic for the revision pointers
	 *
	 * @param {string} id
	 * @constructor
	 */
	var Pointer = function ( id ) {
		this.view = new mw.libs.revisionSlider.PointerView( this, id );
	};

	$.extend( Pointer.prototype, {
		/**
		 * @type {number}
		 */
		position: 0,

		/**
		 * @type {PointerView}
		 */
		view: null,

		/**
		 * @param {number} p
		 */
		setPosition: function ( p ) {
			this.position = p;
		},

		/**
		 * @return {number}
		 */
		getPosition: function () {
			return this.position;
		},

		/**
		 * @return {PointerView}
		 */
		getView: function () {
			return this.view;
		}
	} );

	mw.libs.revisionSlider = mw.libs.revisionSlider || {};
	mw.libs.revisionSlider.Pointer = Pointer;
}( mediaWiki, jQuery ) );
