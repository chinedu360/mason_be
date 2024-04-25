const Members = require("../../models/members/members");
const User = require("../../models/user/user.modal");
const { registerUser } = require("../auth/auth.controller");

async function createMember(req, res, next) {
  try {
    const {
      name,
      level,
      officerTitle,
      phoneNumber,
      workPhone,
      email,
      address,
    } = req.body;

    // console.log("Creating member...");
    // console.log("Request body:", req.body); // Log request body
    // console.log("Files uploaded:", req.files); // Log uploaded files

    let profilePicture = "Default.png"; // Default value

    if (req.files && req.files.length > 0) {
      profilePicture = req.files[0].location;
    }

    // console.log("Profile picture:", profilePicture); // Log profile picture value

    let data = {
      name,
      level,
      officerTitle,
      phoneNumber,
      workPhone,
      email,
      address,
      profilePicture,
      // passwordResetToken,
      // passwordResetExpires,
    };

    // console.log("Data:", data); // Log data object

    if (!name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user already exists
    const isUser = await User.findByEmail(data.email);
    if (isUser[0][0]) {
      return res.status(409).json({ message: "User already exists" });
    }

    const singleUser = await registerUser(
      data,
      req,
      res,
      next,
      (single = true)
    );

    return res.status(200).json({
      message: "User registered successfully",
      singleUser: singleUser,
    });
  } catch (error) {
    console.error("Error creating member:", error); // Log error
    res.status(500).send({ message: "Error.", error });
  }
}

async function getMemebers(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const members = await Members.getMembers(page, limit);

    // Filter the fields to include only the specified ones
    const filteredResponse = members.map((member) => ({
      id: member.id,
      name: member.name,
      level: member.level,
      officerTitle: member.officerTitle,
      phoneNumber: member.phoneNumber,
      workPhone: member.workPhone,
      email: member.email,
      address: member.address,
      profilePicture: member.profilePicture,
      isAdmin: member.isAdmin,
      isBrother: member.isBrother,
      lodgeid: member.lodgeid,
    }));

    return res.status(200).json({
      message: "Members found",
      length: filteredResponse.length,
      currentPage: page,
      itemsPerPage: limit,
      data: filteredResponse,
    });

    // return res.status(200).json({ message: filteredResponse });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "An error occurred while getting officers", error });
  }
}

async function updateMember(req, res, next) {
  try {
    const { id } = req.params;
    const {
      name,
      level,
      officerTitle,
      phoneNumber,
      workPhone,
      email,
      address,
    } = req.body;

    console.log(req.body, id);
    const updateResp = new Members(
      name,
      level,
      officerTitle,
      phoneNumber,
      workPhone,
      email,
      address
      //   profilePicture
      //   passwordResetToken,
      //   passwordResetExpires
    );
    const affectedRows = await updateResp.update(id);

    if (affectedRows === null) {
      return res.status(404).json({ message: "Member not updated" });
    }

    res.status(200).json({ message: "Member updated", updateResp });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function deleteMember(req, res, next) {
  try {
    const { id } = req.params;

    const resp = await Members.deleteMember(id);

    return res.status(200).json({ message: resp });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function searchMembers(req, res, next) {
  try {
    const searchTerm = req.query.term;

    console.log({ searchTerm });

    if (!searchTerm) {
      return res.status(404).json({ message: "No search term" });
    }

    const resp = await Members.searchMember(searchTerm);

    // Filter the fields to include only the specified ones
    const filteredResponse = resp.map((member) => ({
      id: member.id,
      name: member.name,
      level: member.level,
      officerTitle: member.officerTitle,
      phoneNumber: member.phoneNumber,
      workPhone: member.workPhone,
      email: member.email,
      address: member.address,
      profilePicture: member.profilePicture,
    }));

    return res.status(200).json({ message: filteredResponse });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
module.exports = {
  createMember,
  getMemebers,
  updateMember,
  deleteMember,
  searchMembers,
};
