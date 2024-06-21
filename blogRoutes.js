const express = require('express')
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController,userBlogController } = require('../controllers/blogController')

// router object

const router = express.Router()

// routes
// GET || all blogs
router.get('/all-blog', getAllBlogsController)

router.post('/create-blog', createBlogController)

router.put('/update-blog/:id', updateBlogController)

router.get('/get-blog/:id', getBlogByIdController)

router.delete('/delete-blog/:id', deleteBlogController)

// GET || user blog
router.get('/user-blog/:id',userBlogController)

module.exports = router