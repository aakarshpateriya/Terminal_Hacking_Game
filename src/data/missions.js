export const missions = [
    {
      id: 1,
      name: "Hack into Bank Server",
      description: "Access the bank logs and extract account details.",
      targetSystem: {
        "logs.txt": "Transaction History: ***Confidential***",
        "credentials.txt": "Admin Password: Bank@1234",
      },
      objective: "Find the admin password inside 'credentials.txt'",
      reward: "5000 Crypto Coins",
    },
    {
      id: 2,
      name: "Bypass Government Firewall",
      description: "Extract classified data from a government database.",
      targetSystem: {
        "classified.txt": "TOP SECRET: [REDACTED]",
        "firewall.cfg": "Firewall Rules - Protected",
      },
      objective: "Access the 'classified.txt' file",
      reward: "8000 Crypto Coins",
    },
  ];
  