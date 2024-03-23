const Officer = require("../../models/officer/officer");

const getAllOfficer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const officers = await Officer.getOfficer(page, limit);

    // Filter the fields to include only the specified ones
    const filteredResponse = officers.map((member) => ({
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
  } catch (error) {
    console.error("Error getting record:", error);
    return res
      .status(404)
      .json({ error: "An error occurred while getting officers", error });
  }
};

async function updateOfficer(req, res, next) {
  try {
    const { id } = req.params;
    const { name, level } = req.body;

    console.log({ id, name, level });

    const updateResp = new Officer(name, level);
    const affectedRows = await updateResp.update(id);

    if (affectedRows === null) {
      return res.status(404).json({ message: "Officer not found" });
    }

    res.status(200).json({ message: "Officer updated", updateResp });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function deleteOfficerRole(req, res, next) {
  try {
    const { id } = req.params;

    const resp = await Officer.deleteOfficer(id);

    return res.status(200).json({ message: resp });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = {
  getAllOfficer,
  updateOfficer,
  deleteOfficerRole,
};
