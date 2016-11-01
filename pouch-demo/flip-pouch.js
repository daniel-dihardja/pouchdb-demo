/**
 * Created by danieldihardja on 01/11/16.
 */
(function() {

	angular.module('flip-pouch', [])
		.provider('$flipPouch', flipPouch);
	
	function flipPouch() {

		var _this = this;

		var _dbRemote;
		var _dbLocal;

		var _remoteCouchDBUrl;
		var _username;
		var _password;
		var _dbName;

		this.setRemoteCouchDB = function(remoteUrl) {
			_remoteCouchDBUrl = remoteUrl;
		};

		this.setUsername = function(username) {
			_username = username;
		};

		this.setPassword = function(password) {
			_password = password;
		};

		this.setDBName = function(name) {
			_dbName = name;
		};

		this.$get = ['$q', function($q) {
			_this.$q = $q;
			return {
				db: _dbLocal,
				sync: sync,
				wissensspeicher: {
					themeByDotId: wsThemeByDotId
				}
			}
		}];


		//--------------------------//
		// Helper functions
		//--------------------------//

		function sync() {
			var defer = _this.$q.defer();
			var ajaxOptions = {
				ajax: {
					headers: {
						Authorization: 'Basic ' + window.btoa(_username+ ':' + _password)
					}
				}
			};

			_dbRemote = new PouchDB(_remoteCouchDBUrl, {skipSetup: true});
			_dbRemote.login(_username, _password, ajaxOptions, function(err, res) {

				if(err) {
					defer.reject(err);
					return;
				}

				// create a new local db instance here
				_dbLocal = new PouchDB(_dbName);

				// replicate the remote couchdb
				PouchDB.replicate(_remoteCouchDBUrl, _dbName)

					.on('complete', function(info) {
						defer.resolve(info);
					})
					.on('error', function(err) {

						// an error could be no internet connection.
						// therefore just go on

						defer.resolve();
					})
			});

			return defer.promise;
		}

		function wsThemeByDotId(dotId) {
			var defer = _this.$q.defer();
			_dbLocal.query('WSThema/byDotId', {key: dotId})
				.then(function(res) {
					defer.resolve(res.rows[0].value);
				});
			return defer.promise;
		}
	}
})();