/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

	config.language = 'ja';

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	// config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;h4;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	config.image_previewText = ' ';

	config.removePlugins = 'iframe';

	// config.fontSize_style = {
	// 	  element: 'style',
	// 	  styles: { 'font-size': '#(size)' },
	// 	  overrides: [ { element: 'font', attributes: { 'size': null } } ]
	// };

	// config.colorButton_foreStyle = {
	// 	  element: 'style',
	// 	  styles: { color: '#(color)' }
	// };

	config.coreStyles_underline = {
		element: 'span',
		attributes: { 'class': 'ss-cke-underline' }
	};

	config.coreStyles_strike = {
		element: 'del'
	};

	config.templates_replaceContent = false;

	config.stylesSet = 'ss-styles:/assets/js/ckeditor/ss-styles.js'
};
