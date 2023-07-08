import {
	postHistPlace,
	getHistPlace,
	getHistPlaces,
	removeHistPlace,
	getRateHistPlace,
	postRateHistPlace,
} from '../../controllers/histPlace.controller.js'

export default async function (fastify, opts) {
	// histPlace
	fastify.get('/', getHistPlaces)

	fastify.get('/:id', getHistPlace)

	fastify.post('/', postHistPlace)

	fastify.delete('/:id', removeHistPlace)

	// rating
	fastify.get('/:id/rating', getRateHistPlace)

	fastify.post('/:id/rating', postRateHistPlace)
}
