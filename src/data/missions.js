export const missions = [
    {
      id: 1,
      name: "Bank Heist",
      description: "Hack into a bank database to retrieve client data.",
      objective: "Find and decrypt account credentials.",
      targetSystem: {
        "credentials.txt": "Encrypted Data",
        "logs.txt": "Access Logs",
      },
      hasFirewall: true,
      requiresPassword: false,  // 🚀 No password needed for this one
    },
    {
      id: 2,
      name: "Government Database",
      description: "Access confidential records.",
      objective: "Extract classified files.",
      targetSystem: {
        "records.txt": "Classified Documents",
        "logs.txt": "Restricted Logs",
      },
      hasFirewall: false,
      requiresPassword: true,  // 🔐 This one requires a password!
      possiblePasswords: ["alpha123", "securepass", "root42", "hackerman", "shadow"], // Random passwords
      correctPassword: "root42", // Only one is correct
    }
  ];
  