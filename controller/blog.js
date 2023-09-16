const BLOG = require('../model/blog');

// Create-Blog

exports.createBlog = async function (req, res, next) {

    try {

        req.body.img = req.file.filename;
        req.body.user = req.userId;
        const createBlog = await BLOG.create(req.body);
        res.status(201).json({
            status: "Success",
            msg: "Blog Create Successfully",
            data: createBlog
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Blog not Create Successfully",
            data: error
        })
    }
}


// Get-Blog

exports.getBlog = async function (req, res, next) {

    try {
        const getBlog = await BLOG.find().populate('category').populate('user').sort({ createdAt: -1 });
        res.status(200).json({
            status: "Success",
            msg: "Blog get Successfully",
            data: getBlog
        })
    } catch (error) {
        res.status(400).json({
            status: " Fail",
            msg: "Blog not get Successfully",
            data: error
        })
    }
}



exports.searchBlog = async function (req, res, next) {
    try {
        const searchTerm = req.query.q;

        const searchResults = await BLOG.find({
            $and: [
                {
                    $or: [
                        { title: { $regex: new RegExp(searchTerm, 'i') } },
                        { description: { $regex: new RegExp(searchTerm, 'i') } },
                    ]
                },
                {
                    'category.name': searchTerm
                },
                {
                    'user.name': searchTerm
                }
            ]
        }).populate('category').populate('user').sort({ createdAt: -1 });

        res.status(200).json({
            status: "Success",
            msg: "Blog search successful",
            data: searchResults
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Blog search failed",
            data: error
        });
    }
};


// Get-Blog by User

exports.getuserBlog = async function (req, res, next) {

    try {
        const getBlog = await BLOG.find({ user: req.userId }).populate('category').populate('user').sort({ createdAt: -1 });
        res.status(200).json({
            status: "Success",
            msg: "User-Blog get Successfully",
            data: getBlog
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User-Blog not get Successfully",
            data: error
        })
    }
}


// Update-Blog

exports.updateBlog = async function (req, res, next) {

    try {

        if (req.file) {
            req.body.img = req.file.filename;
        } else {
            req.body.img = req.body.img;
        }

        await BLOG.findByIdAndUpdate(req.query._id, req.body);
        res.status(200).json({
            status: "Success",
            msg: "Blog Update Successfully",
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Blog not Update Successfully",
            data: error,
        })
    }
}


// Delete-Blog

exports.deleteBlog = async function (req, res, next) {

    try {
        await BLOG.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            msg: "Blog Delete Successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Blog not Delete Successfully",
            data: error,
        })
    }
}