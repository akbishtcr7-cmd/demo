const getDashboardStats = (req, res) => {
  const updatedAt = new Date().toISOString();

  res.json({
    success: true,
    stats: [
      {
        label: "Active users",
        value: "128",
        updatedAt
      },
      {
        label: "Monthly visits",
        value: "4.2K",
        updatedAt
      },
      {
        label: "Tasks completed",
        value: "312",
        updatedAt
      }
    ]
  });
};

module.exports = {
  getDashboardStats
};
