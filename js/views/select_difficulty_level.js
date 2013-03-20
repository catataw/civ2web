/*global Backbone */
var app = app || {};

$(function ($) {

	'use strict';

	app.SelectDifficultyLevelView = Backbone.View.extend({

		el: '#app',

		initialize: function() {

			_.bindAll(this);

			var _this = this;

			app.Templates.load('select_difficulty_level', {

				success: function(html) {

					_this.selectDifficultyLevelTemplate = _.template(html);

					_this.render();
					_this.define_elements();
					_this.observe();

					_this.resize();

				},

				error: function() {

					console.log('Failed to load template: select_difficulty_level');

				}

			});

		},

		define_elements: function() {

			this.$view = this.$('.view');

			this.$form = this.$('.window.form');
			this.$fields = this.$form.find('input[name="difficulty_level"]');
			this.$submit_button = this.$form.find('.button.submit');
			this.$cancel_button = this.$form.find('.button.cancel');

		},

		observe: function() {

			this.$submit_button.on('click', this.formSubmitted);
			this.$cancel_button.on('click', this.sendBackToMainScreen);

			$(window).on('resize.app', _.bind(this.resize, this));

		},

		render: function() {
		
			this.$el.html(this.selectDifficultyLevelTemplate());
		
		},

		resize: function() {

			this.setViewHeight();

		},

		setViewHeight: function() {

			var appHeight = app.AppView.getAppHeight();
			var viewPaddingMarginBorder = this.$view.borderPaddingMarginHeight();

			this.$view.height(appHeight - viewPaddingMarginBorder);

		},

		sendBackToMainScreen: function() {

			new app.MainScreenView();

		},

		formSubmitted: function() {

			var difficultyLevel = this.getSelectedDifficultyLevel();

			switch (difficultyLevel)
			{
				case 'chieftain':
				case 'warlord':
				case 'prince':
				case 'king':
				case 'emperor':
				case 'deity':

					// Send them to the Select Number of Civs view.
					new app.SelectNumberOfCivsView();

				break;
				
				default:

					console.log('invalid selection!');

				break;
			}

		},

		getSelectedDifficultyLevel: function() {

			var checked = this.$fields.filter(':checked');

			return checked.length > 0 ? checked.val() : null;

		}


	});

});