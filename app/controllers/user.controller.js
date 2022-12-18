export const allAcess = (req, res) => {
  res.status(200).send("Public content.");
};

export const userBoard = (req, res) => {
  res.status(200).send("User content.");
};

export const adminBoard = (req, res) => {
  res.status(200).send("Admin content.");
};

export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator content.");
};
