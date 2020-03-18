const express = require("express");
const Post = require("../data/db.js");

//creates a new router - default router
const router = express.Router();

//ENPOINTS BELOW =>

//Endpoint will gather all posts from the database ✔
router.get("/", (req, res) => {
  const allPostBody = req.body;
  Post.find(allPostBody)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//Endpoint will gather a specific post from a unique id from the database ✔
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => {
      console.log(post);
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "The post information could not be retrieved."
      });
    });
});

//Endpoint will get a specific comment according to a specific id provided ✔
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Post.findPostComments(id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The comments information could not be retrieved."
      });
    });
});

//Enpoint will add a post to the database ✔
router.post("/", (req, res) => {
  const postBody = req.body;
  Post.insert(postBody)
    .then(post => {
      if (post) {
        res.status(201).json(postBody);
      }
    })
    .catch(error => {
      if (!postBody.title && !postBody.name) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      }
    });
});

//Endpoint will add a comment to a specific post according to the appropriate id
router.post('/:id/comments', (req, res) => {
    const addBody = req.body;
    const post_id = req.params.id; // WIP

    Post.insertComment(addBody)
        .then(add => {
            console.log(addBody);
            if (addBody) {
                res.status(201).json(addBody);
            }
            else {
                res.status(404).json({ message: "The post with the specified id does not exist" });
            }
        })
        .catch(err => {
            if (!addBody.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment" });
            }
            else {
                res.status(500).json({ error: "There was an error while saving the comment to the database"});
            }
        })
});

//Endpoint will delete a specific post accoriding to a specific id provided ✔
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id)
      .then(post => {
        return post
          ? Post.remove(id)
              .then(deleted => {
                if (deleted) {
                  res.status(200).json(post);
                }
              })
              .catch(err => {
                res.status(500).json({
                  error: "The post could not be removed"
                });
              })
          : res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
      })
});

//Enpoint will update a specific post according to a specific id provided ✔
router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Post.update(id, changes)
    .then(updated => {
      if (changes) {
        res.status(200).json(changes);
      } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
      }

    })
    .catch(error => {
        if (!changes.title && !changes.contents) {
            res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        } else {
            res.status(500).json({error: "The post information could not be modified."});
        }
    });
});

module.exports = router;
