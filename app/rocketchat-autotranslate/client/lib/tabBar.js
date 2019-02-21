import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { settings } from '/app/rocketchat-settings';
import { hasAtLeastOnePermission } from '/app/rocketchat-authorization';
import { TabBar } from '/app/rocketchat-ui-utils';

Meteor.startup(function() {
	Tracker.autorun(function() {
		if (settings.get('AutoTranslate_Enabled') && hasAtLeastOnePermission(['auto-translate'])) {
			TabBar.addButton({
				groups: ['channel', 'group', 'direct'],
				id: 'autotranslate',
				i18nTitle: 'Auto_Translate',
				icon: 'language',
				template: 'autoTranslateFlexTab',
				order: 20,
			});
		} else {
			TabBar.removeButton('autotranslate');
		}
	});
});