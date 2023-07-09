import {
	uploadImage,
} from '../../controllers/upload.controller.js'

export default async function (fastify, opts) {
    // POST /uploads/image
	fastify.post('/image', uploadImage)
}