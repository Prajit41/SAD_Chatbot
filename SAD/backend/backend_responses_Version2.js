// Simulated therapeutic chatbot logic

function analyzeEmotion(text) {
  text = text.toLowerCase();
  if (text.includes('tired') || text.includes('exhausted') || text.includes('fatigue'))
    return 'tired';
  if (text.includes('anxious') || text.includes('anxiety') || text.includes('worry') || text.includes('panic'))
    return 'anxious';
  if (text.includes('sad') || text.includes('down') || text.includes('depress'))
    return 'sad';
  if (text.includes('happy') || text.includes('joy') || text.includes('good'))
    return 'happy';
  if (text.includes('stress') || text.includes('stressed') || text.includes('overwhelm'))
    return 'stressed';
  if (text.includes('lonely') || text.includes('alone'))
    return 'lonely';
  if (text.includes('motivation') || text.includes('motivated'))
    return 'motivation';
  if (text.includes('angry') || text.includes('frustrated') || text.includes('mad'))
    return 'angry';
  if (text.match(/\b(thank|thanks|appreciate|grateful)\b/))
    return 'gratitude';
  return 'neutral';
}

const emotionReplies = {
  tired: [
    "It sounds like you're feeling tired. Sometimes rest is the most productive thing you can do. Have you tried a gentle walk or a warm cup of tea?",
    "Fatigue can weigh heavy. Remember, it's okay to take breaks and listen to your body.",
    "Maybe a little sunlight or stretching could help. Be kind to yourself today."
  ],
  anxious: [
    "It’s normal to feel anxious sometimes. Try focusing on your breath and grounding yourself in the present moment.",
    "When anxiety visits, remind yourself: these feelings will pass. Maybe a calming activity, like listening to music or doodling, could help.",
    "Would you like to try a short breathing exercise together?"
  ],
  sad: [
    "I'm sorry you're feeling down. Remember, every feeling is valid, and spring brings new beginnings.",
    "Sometimes talking about what’s making you sad can help. I’m here for you.",
    "Would you like a gentle mood-lifting tip?"
  ],
  happy: [
    "That’s wonderful to hear! Celebrate your happy moments, no matter how small.",
    "Joy is contagious—spread it around you! What’s making you feel good today?",
    "Let’s savor this spring feeling together!"
  ],
  stressed: [
    "Stress can be overwhelming. Try breaking things into smaller steps, or take a mindful pause.",
    "Remember, you don’t have to do everything at once. What’s one thing you could let go of right now?",
    "Taking deep breaths and stretching your body can ease stress. Want to try?"
  ],
  lonely: [
    "Loneliness can be tough. Would you like some ideas for reaching out or self-care?",
    "You are not alone—even when it feels that way. I’m here to listen.",
    "Connecting with nature or a pet can be comforting. Would you like a spring self-connection tip?"
  ],
  motivation: [
    "Motivation can bloom and fade. Maybe set a gentle goal for today—something small and spring-like.",
    "You’re doing better than you think. Even small steps count!",
    "Let’s find a tiny action you can take to nurture yourself."
  ],
  angry: [
    "Anger is a natural emotion. What’s beneath it? Sometimes a brisk walk or journaling can help.",
    "Let’s breathe together for a moment. You deserve to feel heard.",
    "Would you like a technique to help manage frustration?"
  ],
  gratitude: [
    "Gratitude makes every season brighter. Thank you for sharing your feelings with me!",
    "Appreciating the little things is powerful. What else are you grateful for today?",
    "Let’s take a deep breath and feel the warmth of gratitude."
  ],
  neutral: [
    "I'm here for you, whatever you're feeling. Want a springtime habit suggestion?",
    "Tell me what’s on your mind, or ask for a mood-boosting tip!",
    "Spring is a season of renewal—what would you like to talk about today?"
  ]
};

function generateReply(messages) {
  const history = messages.filter(msg => msg.role === 'user' || msg.role === 'assistant');
  const lastUserMessage = messages.slice().reverse().find(msg => msg.role === 'user');
  const conversation = history.map(msg => `[${msg.role === 'user' ? 'You' : 'Spring'}]: ${msg.content}`).join('\n');

  // Memory & context
  let memory = '';
  if (history.length > 4) {
    memory = "I remember what you’ve shared with me—thank you for letting me be here for you.";
  }

  if (!lastUserMessage) return "I'm here to listen—tell me how you feel today!";

  const emotion = analyzeEmotion(lastUserMessage.content);
  const replies = emotionReplies[emotion] || emotionReplies['neutral'];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  
  // Special followups based on conversation
  if (emotion === 'sad' && history.some(m => m.content && m.content.match(/cry|tears|weep/))) {
    return "Tears are a healthy release. It's okay to feel deeply—I'm here for you. If you'd like, I can suggest a gentle activity.";
  }
  if (emotion === 'anxious' && lastUserMessage.content.match(/panic|can't breathe|heart/)) {
    return "Panic can feel frightening. Try to focus on slow, deep breaths. Would you like a simple breathing technique?";
  }

  return (memory ? memory + " " : "") + reply;
}

module.exports = { generateReply };