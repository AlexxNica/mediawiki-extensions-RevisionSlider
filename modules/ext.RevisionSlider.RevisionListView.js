( function ( mw, $ ) {
	var RevisionListView = function ( revisionList ) {
		this.revisionList = revisionList;
	};

	$.extend( RevisionListView.prototype, {
		/**
		 * @type {RevisionList}
		 */
		revisionList: null,

		render: function ( revisionTickWidth ) {
			var $html = $( '<div class="revisions"/>' ),
				revs = this.revisionList.getRevisions(),
				maxChangeSizeLogged = Math.log( this.revisionList.getBiggestChangeSize() ),
				i, diffSize, $tooltip, relativeChangeSize;

			for ( i = 0; i < revs.length; i++ ) {
				diffSize = revs[ i ].getRelativeSize();
				relativeChangeSize = diffSize !== 0 ? Math.ceil( 65.0 * Math.log( Math.abs( diffSize ) ) / maxChangeSizeLogged ) + 5 : 0;
				$tooltip = this.makeTooltip( revs[ i ] );

				$html
					.append( $( '<div class="revision-wrapper" title="' + $tooltip + '"/>' )
						.css( {
							left: revisionTickWidth * i + 'px',
							width: revisionTickWidth + 'px'
						} )
						.tipsy( {
							gravity: 's',
							html: true,
							fade: true,
							className: 'revision-tooltip'
						} )
						.append( $( '<div class="revision" data-revid="' + revs[ i ].getId() + '" data-pos="' + ( i + 1 ) + '"/>' )
							.css( {
								height: relativeChangeSize + 'px',
								width: revisionTickWidth + 'px',
								top: diffSize > 0 ? '-' + relativeChangeSize + 'px' : 0
							} )
							.addClass( diffSize > 0 ? 'revision-up' : 'revision-down' )
							.append( $( '<div class="revision-border-box"/>' ) )
						)
					);
			}

			return $html;
		},

		makeTooltip: function ( rev ) {
			var $tooltip = $( '<div/>' )
				.append( '<p><b>' + rev.getFormattedDate() + '</b></p>' )
				.append( $( '<bdi/>' ).append( $( '<p/>' ).text(
					mw.msg( 'revisionslider-label-user', mw.html.escape( rev.getUser() ) )
				) ) )
				.append(
					rev.getComment() ?
						$( '<bdi/>' ).append( $( '<p/>' ).append( $( '<i/>' ).text(
							mw.msg( 'revisionslider-label-comment', mw.html.escape( rev.getComment() ) )
						) ) )
						: ''
				)
				.append( $( '<p/>' ).html(
					mw.msg( 'revisionslider-label-article-size', mw.msg( 'revisionslider-revision-bytes', rev.getSize() ) )
				) )
				.append( rev.isMinor() ? $( '<p/>' ).html( mw.message( 'minoredit' ).text() ) : '' );

			return $tooltip.html();
		}
	} );

	mw.libs.revisionSlider = mw.libs.revisionSlider || {};
	mw.libs.revisionSlider.RevisionListView = RevisionListView;
}( mediaWiki, jQuery ) );
