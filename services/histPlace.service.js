import HistPlace from '../models/histPlace.model.js'

export const findAll = async ({ title, area }) => {
	const filter = {}

	if (title) {
		filter.title = title
	}
	if (area) {
		filter.area = area
	}

	const histPlaces = await HistPlace.find(filter).populate([
		{
			path: 'comments',
			model: 'Comment',
		},
	])

	return histPlaces
}

export const findById = async id => {
	const existedHistPlace = await HistPlace.findById(id).populate([
		{
			path: 'comments',
			model: 'Comment',
		},
	])

	if (!existedHistPlace) {
		throw new Error('HistPlace does not exist!')
	}

	return existedHistPlace
}

export const createHistPlace = async ({
	title,
	area,
	description,
	image,
	qrCode,
}) => {
	const histPlace = await HistPlace.create({
		title,
		area,
		description,
		image,
		qrCode,
	})

	return histPlace
}

export const findByIdAndDelete = async (id) => {
	const histPlace = await HistPlace.findByIdAndDelete(id)

	return histPlace
}

export const attachComment = async (commentId, histPlaceId) => {
	const histPlace = await HistPlace.findOneAndUpdate(
		{ _id: histPlaceId },
		{ $push: { comments: commentId } }
	)

	return histPlace
}

export const getHistPlaceRatingById = async id => {
	const { rating } = await findById(id)
	let average = 0

	//undefined или []
	if (rating?.length > 0) {
		average =
			rating.reduce((accumulator, elem) => accumulator + elem, 0) /
			rating.length
	}

	return {
		rating,
		average,
	}
}

export const rateHistPlaceById = async (id, rating) => {
	await findById(id)

	const histPlace = await HistPlace.findOneAndUpdate(
		{ _id: id },
		{ $push: { rating } },
		{ new: true }
	)

	return histPlace
}

export const findHistoricalPlaceByQrCode = async qrCode => {
	try {
		const histPlace = await HistPlace.findOneAndUpdate({ qrCode })
		return histPlace
	} catch (error) {
		console.error(error)
		return null
	}
}
