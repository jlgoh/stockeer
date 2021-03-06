const mongoose = require("mongoose");
const User = mongoose.model("users");
const requireLogin = require("../middlewares/requireLogin");
mongoose.set("useFindAndModify", false); //deprecation issue

module.exports = (app) => {
  //POST Bookmark
  app.post("/api/bookmarks", requireLogin, async (req, res) => {
    const { symbolName, companyName } = req.body;

    //If a symbol name is not provided
    if (!symbolName) return res.status(400).send("A symbol name is required");

    //Check if symbol name already exists in bookmarks
    const userWithExistingBookmark = await User.findOne({
      _id: req.user.id,
      bookmarks: {
        $elemMatch: { symbolName },
      },
    });
    if (userWithExistingBookmark) {
      return res.status(400).send("User has already bookmarked this symbol");
    }

    //POST a bookmark for user
    const update = {
      $push: {
        bookmarks: {
          symbolName,
          companyName,
          note: "",
          lastUpdated: new Date().toLocaleString("en-SG", {
            timeZone: "Singapore",
          }),
        },
      },
    };
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedUser.bookmarks.slice(-1)[0]);
  });

  //GET all of user bookmarks
  app.get("/api/bookmarks", requireLogin, async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    res.send(user.bookmarks);
  });

  //GET a single bookmark
  app.get("/api/bookmarks/:bookmarkId", requireLogin, async (req, res) => {
    try {
      const bookmark = await User.findOne({
        _id: req.user.id,
      }).select({
        bookmarks: {
          $elemMatch: { _id: req.params.bookmarkId },
        },
        _id: false,
      });

      //If bookmark is not found
      if (bookmark["bookmarks"].length === 0) throw "Invalid Bookmark ID";

      return res.send(bookmark["bookmarks"][0]);
    } catch (err) {
      return res.status(400).send("Invalid Bookmark ID");
    }
  });

  //PATCH Bookmark
  app.patch("/api/bookmarks/:bookmarkId", requireLogin, async (req, res) => {
    try {
      const updatedNote = req.body.note;
      const updatedBookmark = await User.findOneAndUpdate(
        {
          _id: req.user.id,
          bookmarks: {
            $elemMatch: { _id: req.params.bookmarkId },
          },
        },
        {
          $set: {
            "bookmarks.$.note": updatedNote,
            "bookmarks.$.lastUpdated": new Date().toLocaleString("en-SG", {
              timeZone: "Singapore",
            }),
          },
        },
        {
          new: true,
        }
      ).select({
        bookmarks: {
          $elemMatch: { _id: req.params.bookmarkId },
        },
        _id: false,
      });

      res.send(updatedBookmark["bookmarks"][0]);
    } catch (err) {
      res.status(400).send("Invalid Bookmark ID");
    }
  });

  //DELETE Bookmark
  app.delete("/api/bookmarks/:bookmarkId", requireLogin, async (req, res) => {
    try {
      const bookmark = await User.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          $pull: { bookmarks: { _id: req.params.bookmarkId } },
        }
      ).select({
        bookmarks: {
          $elemMatch: { _id: req.params.bookmarkId },
        },
        _id: false,
      });

      //If bookmark is not found
      if (bookmark["bookmarks"].length === 0) throw "Invalid Bookmark ID";

      res.send("Bookmark successfully deleted");
    } catch (err) {
      res.status(400).send("Invalid Bookmark ID");
    }
  });
};
