import mongoose from 'mongoose'

const histPlaceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Title is required field'],
		},
		area: {
			type: String,
			required: [true, 'Area is required field'],
		},
		description: {
			type: String,
		},
		image: {
			type: String,
			required: [true, 'Image is required field'],
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
				required: [true, 'Comments ID is required'],
			},
		],
		rating: [
			{
				type: Number,
			},
		],
	},
	{
		timestamps: true,
	}
)

const HistPlace = mongoose.model('HistPlace', histPlaceSchema)

export default HistPlace
