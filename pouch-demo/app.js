/**
 * Created by danieldihardja on 01/11/16.
 */
(function() {

	angular.module('pouch-demo', ['flip-pouch'])

		.config(['$flipPouchProvider', function($flipPouchProvider) {

			// Bsp. konfiguration des $flipPouchProviders
			$flipPouchProvider.setRemoteCouchDB('http://192.168.99.100:5984/flip');
			$flipPouchProvider.setUsername('admin');
			$flipPouchProvider.setPassword('admin123');
			$flipPouchProvider.setDBName('flip');
		}])

		.controller('appController', ['$scope', '$flipPouch', function($scope, $flipPouch) {

			// Syncen mit der remote CouchDB
			$scope.sync = function() {
				$flipPouch.sync().then(function() {
					console.log('pouchdb synced');
				});
			};

			// Daten eines Themas ausgeben
			$scope.showThemaByDotId = function() {
				var dotId = 'VB6';
				$flipPouch.ws.themeByDotId(dotId).then(function(res) {
					console.log(res);
				})
			}

		}])
})();