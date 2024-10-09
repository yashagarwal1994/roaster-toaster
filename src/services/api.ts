// Mock X API and LLM API

interface XProfile {
  username: string;
  bio: string;
  posts: string[];
}

export const fetchXProfile = async (username: string): Promise<XProfile> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data
  return {
    username,
    bio: `Just your average ${username} tweeting about life, tech, and memes.`,
    posts: [
      `Can't believe it's already Friday! #TGIF`,
      `Just had the best coffee ever at @CoolCafe`,
      `New blog post: "10 reasons why ${username} is awesome" 😎`,
    ],
  };
};

export const generateRoast = async (profile: XProfile): Promise<string> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock roast generation
  const roasts = [
    `Oh, ${profile.username}, your bio screams "I'm unique" louder than a vegan at a BBQ.`,
    `${profile.username}'s tweets are so basic, they make water look spicy.`,
    `If ${profile.username}'s feed was any more generic, it'd be sold in plain white packaging.`,
    `${profile.username} tweets like they're auditioning for a role in "Bland: The Movie".`,
    `I've seen more personality in a bowl of oatmeal than in ${profile.username}'s entire profile.`,
  ];

  return roasts[Math.floor(Math.random() * roasts.length)];
};