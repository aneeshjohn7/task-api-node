export const getHealth = async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  res.json({ status: "ok after 2 seconds" });
};

export const getHealthById = (req, res) => {
  res.json({
    status: "ok",
    id: req.params.id
  });
};