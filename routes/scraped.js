var express = "express";
var router = express.router();

router.get("/scrape", function(req, res) {
    axios.get("https://www.commentarymagazine.com/issues").then(function(response) {
        var $ = cheerio.load(response.data);
        $("a img").each(function(i, element) {

            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            db.Mag.create(result).then(function(dbMag) {
                console.log(dbMag);
            }).catch(function(err) {
                return res.json(err)
            });
        });
        res.send("Scrape Succesful!")
    });
});

router.get("/images", function(req, res) {
    db.Mag.find({}).then(function(dbMag) {
        res.json(dbMag);
    }).catch(function(err) {
        res.json(err);
    });
});

router.get("/images/:id", function(req, res) {
    db.Mag.findOne({ _id: req.params.id })
    .populate("comment").then(function(dbMag) {
        res.json(dbMag);
    }).catch(function(err) {
        res.json(err);
    });
});

router.post("/images/:id", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
        return db.Image.findOneAndUpdate(
            { _id: req.params.id }, 
            { comment: dbComment._id }, 
            { new: true});
    }).then(function(dbMag) {
        res.json(dbMag);
    }).catch(function(err) {
        res.json(err);
    });
});

module.exports = router;