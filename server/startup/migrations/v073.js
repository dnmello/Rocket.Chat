import { Migrations } from '/app/rocketchat-migrations';
import { Users } from '/app/rocketchat-models';

Migrations.add({
	version: 73,
	up() {
		Users.find({ 'oauth.athorizedClients': { $exists: true } }, { oauth: 1 }).forEach(function(user) {
			Users.update({ _id: user._id }, {
				$set: {
					'oauth.authorizedClients': user.oauth.athorizedClients,
				},
				$unset: {
					'oauth.athorizedClients': 1,
				},
			});
		});
	},
});
