const Post = require('../models/post');
const slugfy = require('slugify');



exports.create = (req, res) =>{
    const {title, content, user} = req.body;
    const slug = slugfy(title);

    switch(true){
        case !title:
            return res.status(400).json({error: 'title is required'})
        break;
        case !content:
            return res.status(400).json({error: 'content is required'})
        break;
               
    }

    Post.create({title, content, user, slug}, (err, post) => {
        if(err){
            console.log(err);
            res.status(400).json({error: 'try another title'})
        }
        res.json(post)
    })

}

exports.list = (req, res)=>{
    Post.find({})
        .exec((err, post)=>{
            if(err){
                console.log(err)
            }
            res.json(post);
        })
}

exports.read = (req, res) => {

    const { slug } = req.params;

    Post.findOne({ slug })
        .exec((err, post) => {
            if(err){
                console.log(err)
            }
        res.json(post);
    });
};


exports.update = (req, res) => {

    const { slug } = req.params;

    const {title, content, user} = req.body

    Post.findOneAndUpdate({ slug }, {title, content, user}, {new: true})
        .exec((err, post) => {
            if(err){
                console.log(err)
            }
        res.json(post);
    });
};

exports.remove = (req, res) => {

    const { slug } = req.params;

    Post.findOneAndRemove   ({ slug })
        .exec((err, post) => {
            if(err){
                console.log(err)
            }
        res.json({
            message: 'Post delete'
        });
    });
};