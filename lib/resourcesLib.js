/**
 * Resources library
 */
var request = require('superagent');

var endpoints = require('..\\endpoints\\resourcesEndpoints.json');
var settings = require('..\\settings.json');

var loginEndpoint = endpoints.login.replace("[server]", settings.server)
	.replace("[port]", settings.port);
var resourcesEndpoint = endpoints.resources.replace("[server]", settings.server)
	.replace("[port]", settings.port);
var resourceIdEndpoint = endpoints.resourcesById.replace("[server]", settings.server)
	.replace("[port]", settings.port);

/**
 * Get a token
 * @param {Object} login
 * @returns {Function}
 */
var getToken = function(login){
return request
		.post(loginEndpoint)
		.send(login);
};

exports.getToken = getToken;

/**
 * Get all the resources
 * @returns {Function}
 */
var getResources = function(){
return request
		.get(resourcesEndpoint);
};

exports.getResources = getResources;

/**
 * Get a resource
 * @param {String} resourceId
 * @returns {Function}
 */
var getResource = function(resourceId){
return request
		.get(resourceIdEndpoint.replace("[resourceId]", resourceId));
};

exports.getResource = getResource;

/**
 * Update a resource
 * @param {String} resourceId
 * @param {Object} resource
 * @param {String} token
 * @returns {Function}
 */
var updateResource = function(resourceId, resource, token){
return request
		.put(resourceIdEndpoint.replace("[resourceId]", resourceId))
		.set('Authorization', 'jwt ' + token)
		.send(resource);
};

exports.updateResource = updateResource;

/**
 * Create a resource
 * @param {Object} resource
 * @param {String} token
 * @returns {Function}
 */
var createResource = function(resource, token){			
return request
		.post(resourcesEndpoint)
		.set('Authorization', token)
		.send(resource);
};

exports.createResource = createResource;

/**
 * Delete a resource
 * @param {String} resourceId
 * @param {String} token
 * @returns {Function}
 */
var deleteResource = function(resourceId, token){
return request
		.del(resourceIdEndpoint.replace("[resourceId]", resourceId))
		.set('Authorization', token);
};

exports.deleteResource = deleteResource;