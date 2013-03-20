/*global Backbone */
var app = app || {};

$(function ($) {

	'use strict';

	app.SelectNumberOfCivsView = Backbone.View.extend({

		el: '#app',

		initialize: function() {

			_.bindAll(this);

			var _this = this;

			app.Templates.load('select_number_of_civs', {

				success: function(html) {

					_this.selectNumberOfCivsTemplate = _.template(html);

					_this.render();
					_this.define_elements();
					_this.observe();

					_this.resize();

				},

				error: function() {

					console.log('Failed to load template: select_number_of_civs');

				}

			});

		},

		define_elements: function() {

			this.$view = this.$('.view');

			this.$form = this.$('.window.form');
			this.$fields = this.$form.find('input[name="num_civs"]');
			this.$random_button = this.$form.find('.button.random');
			this.$submit_button = this.$form.find('.button.submit');
			this.$cancel_button = this.$form.find('.button.cancel');

		},

		observe: function() {

			this.$random_button.on('click', this.pickRandom);
			this.$submit_button.on('click', this.formSubmitted);
			this.$cancel_button.on('click', this.sendBackToSelectDifficultyLevelView);

			$(window).on('resize.app', _.bind(this.resize, this));

		},

		render: function() {
		
			this.$el.html(this.selectNumberOfCivsTemplate());
		
		},

		resize: function() {

			this.setViewHeight();

		},

		setViewHeight: function() {

			var appHeight = app.AppView.getAppHeight();
			var viewPaddingMarginBorder = this.$view.borderPaddingMarginHeight();

			this.$view.height(appHeight - viewPaddingMarginBorder);

		},

		sendBackToSelectDifficultyLevelView: function() {

			new app.SelectDifficultyLevelView();

		},

		pickRandom: function() {

			this.$fields.filter(':random').prop('checked', true);

			this.formSubmitted();

		},

		formSubmitted: function() {

			var numCivs = this.getSelectedNumberOfCivs();

			switch (numCivs)
			{
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':

					// Send them to the Select Level of Barbarian Activity view.
					new app.SelectBarbarianLevel();

				break;
				
				default:

					console.log('invalid selection!');

				break;
			}

		},

		getSelectedNumberOfCivs: function() {

			var checked = this.$fields.filter(':checked');

			return checked.length > 0 ? checked.val() : null;

		}


	});

});