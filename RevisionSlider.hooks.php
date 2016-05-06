<?php

/**
 * RevisionSlider extension hooks
 *
 * @file
 * @ingroup Extensions
 * @license GPL-2.0+
 */
class RevisionSliderHooks {

	public static function onDiffViewHeader(
		DifferenceEngine $diff,
		Revision $oldRev,
		Revision $newRev
	) {
		$out = RequestContext::getMain()->getOutput();
		$out->addModules( 'ext.RevisionSlider.init' );
		$out->addHTML(
			Html::rawElement(
				'div',
				[
					'id' => 'revision-slider-container',
					'style' => 'min-height: 150px;',
					'data-oldrev' => $oldRev->getId(),
					'data-newrev' => $newRev->getId(),
				],
				Html::element(
					'p',
					[
						'id' => 'revision-slider-placeholder',
						'style' => 'text-align: center',
					],
					( new Message( 'revisionslider-loading-placeholder' ) )->parse()
				) .
				Html::rawElement(
					'noscript',
					[ ],
					Html::element(
						'p',
						[ 'style' => 'text-align: center' ],
						( new Message( 'revisionslider-loading-noscript' ) )->parse()
					)
				)
			)
		);
	}

	public static function onResourceLoaderTestModules( array &$testModules, ResourceLoader $rl ) {
		$testModules['qunit']['ext.RevisionSlider.tests'] = [
			'scripts' => [
				'tests/RevisionSlider.Revision.test.js',
				'tests/RevisionSlider.Pointer.test.js',
				'tests/RevisionSlider.PointerView.test.js',
			],
			'dependencies' => [
				'ext.RevisionSlider.Revision',
				'ext.RevisionSlider.Pointer',
				'ext.RevisionSlider.PointerView',
			],
			'localBasePath' => __DIR__,
		];

		return true;
	}
}
