const mongoose = require('../utils/db.utils');
const error = require('../utils/error');
const NewsModel = require('../schemas/news.schema');
const fs = require('fs');

module.exports = {
    async createNews(req, res) {
        let news = new NewsModel(req.body);
        if (req.body.imageData) {
            let data = req.body.imageData.replace(/^data:image\/\w+;base64,/, "");
            let buf = new Buffer(data, 'base64');
            let timeStamp = (new Date()).getTime()
            fs.writeFile('./images/' + timeStamp + '.png', buf, function(err) {
                if (err) console.log(err);
            });
            news.image = timeStamp + '.png'
        }
        await NewsModel.create(news)
        .then((result) => {
            res.status(200).json({
                news: result
            });
        });
    },
        
    async getNews(req, res) {
        let admin = req.query.isAdmin
        let newsList = (admin) ? await NewsModel.find() : await NewsModel.find({isPublic: true})
        res.status(200).json({
            news: newsList
        });
    },
    async getNewsById(req, res) {
        let id = req.params.id
        let news = await NewsModel.findById(id)
        res.status(200).json({
            news: news 
        });
    },
    async changeNews(req, res) {
        let id = req.params.id
        let news = req.body
        if (news.imageData) {
            let previousNews = await NewsModel.findById(id)
            fs.unlink('./images/' + previousNews.image, function (err) {
                if (err) {
                    return console.log(err)
                }
            }); 
            let data = news.imageData.replace(/^data:image\/\w+;base64,/, "");
            let buf = new Buffer(data, 'base64');
            let timeStamp = (new Date()).getTime()
            fs.writeFile('./images/' + timeStamp + '.png', buf, function(err) {
                if (err) console.log(err);
            });
            news.image = timeStamp + '.png'
        }
        await NewsModel.findByIdAndUpdate(id, news)
            .then(() => NewsModel.findById(id))
            .then((result) => {
                res.status(200).json({
                    news: result
                });
            });
    },
    async deleteNewsById(req, res) {
        let id = req.params.id
        let previousNews = await NewsModel.findById(id)
        if (previousNews.image) {
            fs.unlink('./images/' + previousNews.image, function (err) {
                if (err) {
                    return console.log(err)
                }
            }); 
        }
        NewsModel.findByIdAndRemove(id)
            .then((result) => {
                res.status(200).json({
                    news: result
                });
            });
    },
    async deleteNews(req, res) {
        let deletedIds = []
        for (let i = 0; i < req.body.checkedIds.length; i++) {
            let previousNews = await NewsModel.findById(req.body.checkedIds[i])
            if (previousNews.image) {
                fs.unlink('./images/' + previousNews.image, function(err) {
                    if(err) {
                        return console.log(err)
                    }
                }); 
            }
            let deletedItem = await NewsModel.findByIdAndRemove(req.body.checkedIds[i])
            deletedIds.push(deletedItem._id)
        }
        res.status(200).json({
            news: deletedIds
        });
    }
}
