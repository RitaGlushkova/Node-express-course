const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

//This route gets all members
router.get("/", (req, res) => {
  res.json(members);
});

//Get Single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === Number(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `Member with id of ${req.params.id} not found` });
  }
});
//Create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include a name and email" });
  }
  members.push(newMember);
  res.redirect("/");
//res.json(members);
});

//Update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === Number(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: "Member was updated", member });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `Member with id of ${req.params.id} not found` });
  }
});

//Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter((member) => member.id !== Number(req.params.id)),
    });
  } else {
    res
      .status(400)
      .json({ msg: `Member with id of ${req.params.id} not found` });
  }
});

module.exports = router;
