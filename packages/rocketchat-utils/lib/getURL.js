import { Meteor } from 'meteor/meteor';
import { settings } from 'meteor/rocketchat:settings';
import s from 'underscore.string';

export const getURL = (path, { cdn = true, full = false } = {}) => {
	const cdnPrefix = s.rtrim(s.trim(settings.get('CDN_PREFIX') || ''), '/');
	const pathPrefix = s.rtrim(s.trim(__meteor_runtime_config__.ROOT_URL_PATH_PREFIX || ''), '/');

	let basePath;

	const finalPath = s.ltrim(s.trim(path), '/');

	if (cdn && cdnPrefix !== '') {
		basePath = cdnPrefix + pathPrefix;
	} else if (full) {
		return Meteor.absoluteUrl(finalPath);
	} else {
		basePath = pathPrefix;
	}

	return `${ basePath }/${ finalPath }`;
};
