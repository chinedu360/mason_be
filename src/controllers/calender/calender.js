const Calender = require("../../models/calender/calender");

async function createCalender(req, res, next) {
  try {
    const { user_id, public_link, brother_link, officer_link } = req.body;

    if (!user_id) {
      return res
        .status(400)
        .json({ message: "Error: Missing required fields" });
    }

    const calender = new Calender(
      user_id,
      public_link,
      brother_link,
      officer_link
    );

    const resp = await calender.save();

    if (resp === null) {
      return res
        .status(200)
        .json({ message: "cannot have multiple calender records" });
    } else {
      return res
        .status(200)
        .json({ message: "calender links created successfully", resp });
    }
  } catch (error) {
    console.error("Error calender link:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function getCalenderLinks(req, res, next) {
  try {
    const calender = await Calender.findCalnderLinks();

    return res
      .status(200)
      .json({ message: "Calender links found", data: calender });
  } catch (error) {
    //   console.error("Error getting article:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function updateCalenderLinks(req, res, next) {
  try {
    const { public_link, brother_link, officer_link } = req.body;
    console.log({ public_link, brother_link, officer_link });

    const updatedResp = new Calender(
      undefined,
      public_link,
      brother_link,
      officer_link
    );
    const resp = await updatedResp.update();

    if (resp > 0) {
      return res.status(200).json({
        message: "Calendar links updated successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "No calendar links were updated",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = { createCalender, getCalenderLinks, updateCalenderLinks };
