##CouchDB Cors Settings
    credentials: true
    headers: accept, authorization, content-type, origin, referer, x-csrf-token
    methods: GET, POST, PUT, DELETE, OPTIONS, HEAD
    origins: *
    
    
##Dependencies
    bower install pouchdb
    bower install pouchdb-authentication
    
####Module
    angular.module('pouch-demo', ['flip-pouch'])
    
####Config
    .config(['$flipPouchProvider', function($flipPouchProvider) {

        // Bsp. konfiguration des $flipPouchProviders
        $flipPouchProvider.setRemoteCouchDB('http://192.168.99.100:5984/flip');
        $flipPouchProvider.setUsername('admin');
        $flipPouchProvider.setPassword('admin123');
        $flipPouchProvider.setDBName('flip');
    }])
    
##API    
    
####sync
    $flipPouch.sync().then(function() {
        console.log('pouchdb synced');
    });

####ws.themeByDotId
    $flipPouch.ws.themeByDotId(dotId).then(function(res) {
        console.log(res);
    })