import * as HistPlaceService from '../services/histPlace.service.js'

export const getHistPlaces = async (req, reply) => {
	try {
		const { query } = req

		const histPlaces = await HistPlaceService.findAll(query)

		return reply.code(200).send(histPlaces)
	} catch (error) {
		console.error(error)
		return reply.code(error.code).send(error)
	}
}

export const postHistPlace = async (req, reply) => {
	try {
		const histPlace = HistPlaceService.createHistPlace(req.body)

		return histPlace
	} catch (error) {
		console.error(error)
		return reply.code(404).send(error)
	}
}

export const removeHistPlace = async (req, reply) => {
	try {
		const histPlace = await HistPlaceService.findByIdAndDelete(req.params.id)

		return histPlace
	} catch (error) {
		console.error(error)
		return reply.code(500).send({ status: 500, message: error.message })
	}
}

export const getHistPlace = async (req, reply) => {
	try {
		const histPlace = HistPlaceService.findById(req.params.id)

		return histPlace
	} catch (error) {
		console.error(error)
		return reply.code(500).send({ status: 500, message: error.message })
	}
}

export const getRateHistPlace = async (req, reply) => {
	try {
		const rating = HistPlaceService.getHistPlaceRatingById(req.params.id)

		return rating
	} catch (error) {
		console.error(error)
		return reply.code(500).send({ status: 500, message: error.message })
	}
}

export const postRateHistPlace = async (req, reply) => {
	try {
		const histPlace = HistPlaceService.rateHistPlaceById(
			req.params.id,
			req.body.rating
		)

		return histPlace
	} catch (error) {
		console.error(error)
		return reply.code(500).send({ status: 500, message: error.message })
	}
}

export const getQrCode = (req, res) => {
	const qrCode = req.params.qrCode
	// Здесь вы можете выполнить логику для поиска исторического места на основе qrCode
	// Затем верните информацию об историческом месте в формате JSON
	const histPlace = findHistoricalPlaceByQrCode(qrCode)
	res.json(histPlace)
}
