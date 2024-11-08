module.exports = {
    apps: [
      {
        name: "aws-project-management",
        script: "npm",
        args: "run dev",
        env: {
          NODE_ENV: "development",
        },
      },
    ],
  };