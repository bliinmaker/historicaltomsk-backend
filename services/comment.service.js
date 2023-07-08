import Comment from '../models/comment.model.js'
import * as HistPlaceService from './histPlace.service.js'

export const findAll = async ({ nickName }) => {
	const comments = await Comment.find({ nickName })

	return comments
}

export const createComment = async ({
	histPlaceId,
	nickName,
	message,
	image,
}) => {
	const histPlace = await HistPlaceService.findById(histPlaceId)

	const comment = await Comment.create({
		nickName: nickName || null,
		message: message || null,
		image: image || null,
	})

	HistPlaceService.attachComment(comment._id, histPlace._id)

	return comment
}

export const findByIdAndDelete = async (id) => {
	const comment = await Comment.findByIdAndDelete(req.params.id)

	return comment
}