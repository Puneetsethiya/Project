require('dotenv').config(); 
const mongoose = require("mongoose");
const Event = require("../../models/event"); 

const MONGO_URI = process.env.MONGO_URI;

const events = [
  {
    day: "Day 1",
    title: "Bulls & Bears",
    subtitle: "Mockstock",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "2 Participants per Team",
    dateTime: "4th April 2025 | 9:30 AM - 12:30 PM",
    venue: "Ground Floor Lab & Room No 101, BMSCCM",
    rules: [
      "Teams get a Demat account with equal balance to trade (buy/sell) shares in specified stock exchanges",
      "Participants can buy/sell shares any number of times",
      "Team with highest profit wins",
      "College ID card is mandatory",
      "Judges decision is final and binding"
    ],
    coordinators: ["Nikita - 9986398863", "Sai Pranav - 9071273230"]
  },
  {
    day: "Day 1",
    title: "Nautanki",
    subtitle: "Mime",
    registration: 1000,
    prize: "5,000 + Trophy",
    participants: "8 to 12 Participants per Team",
    timeLimit: "6+2 minutes",
    dateTime: "4th April 2025 | 10:00 AM - 12:00 PM",
    venue: "Seminar Hall, BMSCCM",
    rules: [
      "Mime makeup, costume, and gloves mandatory",
      "Music must not have lyrics or narration",
      "Judged on theme and overall act",
      "Props prohibited",
      "College ID required",
      "Judges' decision is final"
    ],
    coordinators: ["Rachana - 8197547148", "Janya - 8197187615"]
  },
  {
    day: "Day 1",
    title: "Marketing Event",
    subtitle: "Big Pitcher",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "2 Participants per Team",
    dateTime: "4th April 2025 | 2:30 PM - 4:00 PM",
    venue: "Room No 202, BMSCCM",
    rules: [
      "Round 1 will be \"Guess the Logo Challenge\"",
      "Round 2 will be Qualified participants combine two different products/product categories (given by judges), devise marketing strategies, and sell the product",
      "Vulgarity or obscenity leads to disqualification",
      "Topics announced on the day",
      "College ID required",
      "Judges' decision is final"
    ],
    coordinators: ["Abhyudaya - 9353694887", "Sai Inchara - 8147763010"]
  },
  {
    day: "Day 1",
    title: "Battle of Words",
    subtitle: "Debate",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    timeLimit: "2+1 minutes",
    dateTime: "4th April 2025 | 11:00 AM - 12:00 PM",
    venue: "Room No 304, BMSCCM",
    rules: [
      "Two rounds: Round 1 (For & Against), Round 2 (Rebuttal)",
      "Topic shared a day before; mentioning for/against given topic",
      "Judged on communication, content, confidence, voice modulation, rebuttal",
      "Unparliamentary language leads to disqualification",
      "Dress code: Business Formals",
      "College ID required",
      "Judges' decision is final"
    ],
    coordinators: ["Charuvee - 9788656999", "Anala - 9606189673"]
  },
  {
    day: "Day 1",
    title: "Maathu Manthana",
    subtitle: "Kannada Debate",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Two Participants per College One for and One against the topic",
    timeLimit: "Maximum of 4 minutes for speech + 1 minute for rebuttal",
    topic: "Are Students distracted from education due to social media?",
    dateTime: "4th April 2025 | 11:00 AM - 12:00 PM",
    venue: "Room No.301, BMSCCM",
    rules: [
      "Judges' decision is final and binding"
    ],
    coordinators: ["Manya - 8431138735", "Pramati - 6361143590"]
  },
  {
    day: "Day 1",
    title: "Chanakya",
    subtitle: "Elite Executives",
    registration: 500,
    prize: "3,000 + Trophy",
    participants: "3 members (CEO, CFO, CMO roles)",
    dateTime: "4th April 2025 | 12:00 PM - 2:00 PM",
    venue: "Room No.201, BMSCCM",
    rules: [
      "Teams undergo multiple rounds before the winner is decided",
      "Participants may carry their own laptops",
      "College ID card is mandatory",
      "Judges' decision is final and binding"
    ],
    coordinators: ["Sandeep - 9740059993", "Rishi Vedanth - 6366381561"]
  },
  {
    day: "Day 1",
    title: "Chitratmak",
    subtitle: "Pictionary",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "2 members",
    dateTime: "4th April 2025 | 12:30 PM - 1:30 PM",
    venue: "Room No.203, BMSCCM",
    rules: [
      "One player draws clues for teammates to guess words or phrases from chits",
      "No letters, numbers, spoken words, or gestures allowed for clues",
      "College ID card is mandatory",
      "Judges' decision is final and binding"
    ],
    coordinators: ["Gowrav - 9538585142", "Heer - 9380785922"]
  },
  {
    day: "Day 1",
    title: "Chucklesome",
    subtitle: "Mad Ads",
    registration: 1000,
    prize: "5,000 + Trophy",
    participants: "5-6 members",
    timeLimit: "Each team gets 3+1 minutes",
    dateTime: "4th April 2025 | 12:30 PM - 2:30 PM",
    venue: "Seminar Hall, BMSCCM",
    rules: [
      "Product or item will be given on spot; teams get 20 minutes to prepare a script and act on stage",
      "Creativity and content are judged; vulgarity leads to disqualification",
      "Languages allowed: Kannada, Hindi, English",
      "College ID card is mandatory",
      "Judges' decision is final and binding"
    ],
    coordinators: ["Rohith R - 9148852356", "Charulatha - 7019951982"]
  },
  {
    day: "Day 1",
    title: "Codex Cronicals",
    subtitle: "",
    registration: 500,
    prize: "3,000 + Trophy",
    participants: "3 members",
    timeLimit: "2-3 hours",
    dateTime: "4th April 2025 | 2:00 PM - 4:00 PM",
    venue: "Ground floor lab, BMSCCM",
    rules: [
      "No Internet or electronics allowed",
      "Teams collaborate to solve puzzles and challenges to unlock secrets",
      "College ID card is mandatory",
      "Judges' decision is final and binding"
    ],
    coordinators: ["Kathireshan - 9449407372", "Pradeep - 8197370851"]
  },
  {
    day: "Day 1",
    title: "Art Beat",
    subtitle: "Pencil Sketching",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    timeLimit: "1 hour (50+10 minutes)",
    dateTime: "4th April 2025 | 1:00 PM - 2:00 PM",
    venue: "Room No.302, BMSCCM",
    rules: [
      "Participants will be provided with an A4 white sheet",
      "Finished art must not contain offensive or disgraceful material",
      "College ID card is mandatory",
      "Judges' decision is final and binding"
    ],
    coordinators: ["Kanishka Priya - 9901472913", "Mourya - 9482161446"]
  },
  {
    day: "Day 1",
    title: "Hog A Thon",
    subtitle: "",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    dateTime: "4th April 2025 | 1:00 PM - 2:00 PM",
    venue: "Terrace, BMSCCM",
    rules: [
      "Participants must eat only vegetarian food items provided in the challenge",
      "Misconduct leads to disqualification",
      "College ID card is mandatory",
      "Judges' decision is final and binding"
    ],
    coordinators: ["Vishwas - 6364012350", "Madhumitha - 6362092344"]
  },
  {
    day: "Day 1",
    title: "BGMI: E Sports",
    subtitle: "",
    registration: 1000,
    prize: "5,000 + Trophy",
    participants: "4 Participants per Team",
    dateTime: "4th April 2025 | 2:00 PM - 4:00 PM",
    venue: "Room No 101, BMSCCM",
    rules: [
      "No hacks allowed",
      "College ID card is mandatory",
      "Judges decision is final and binding"
    ],
    coordinators: ["Suraj R - 6363340644", "Jaydeep - 7022428849"]
  },
  {
    day: "Day 1",
    title: "Hum & Hunch",
    subtitle: "Guess the Song",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "2 Participants per Team",
    dateTime: "4th April 2025 | 2:30 PM - 4:00 PM",
    venue: "Seminar Hall, BMSCCM",
    rules: [
      "Multiple rounds",
      "Details disclosed before each round",
      "Prompting or using electronic devices leads to disqualification",
      "College ID required",
      "Judges' decision is final"
    ],
    coordinators: ["Santhosh - 9019064187", "Kavya V - 7829150881"]
  },
  {
    day: "Day 1",
    title: "Danspiration",
    subtitle: "Group Dance",
    registration: 2000,
    prize: "21,000 + Trophy",
    participants: "8 to 15 Participants per team",
    timeLimit: "5+1 minutes",
    dateTime: "4th April 2025 | 4:00 PM - 6:00 PM",
    venue: "Amphitheatre, BMSECAC",
    rules: [
      "No vulgarity will be tollerated",
      "Music should be provided via pen drive",
      "Props are allowed",
      "College ID card is mandatory",
      "Judges decision is final and binding"
    ],
    coordinators: ["Dhanush R - 8197216056", "Srujana - 9686311398", "Shreya S - 8431197164"]
  },
  {
    day: "Day 2",
    title: "STEP UP",
    subtitle: "Free Style Solo Dance",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    timeLimit: "3+1 minutes",
    dateTime: "5th April 2025 | 10:00 AM - 1:00 PM",
    venue: "Seminar Hall, BMSCCM",
    rules: [
      "All dance forms and props allowed",
      "No vulgarity will be tollerated",
      "Music should be provided via pen drive",
      "Props are allowed",
      "College ID card is mandatory",
      "Judges decision is final and binding"
    ],
    coordinators: ["Tarun C - 87922538002", "Vaibhavi - 9483866055"]
  },
  {
    day: "Day 2",
    title: "Poetry Writing",
    subtitle: "",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    timeLimit: "45 minutes",
    dateTime: "5th April 2025 | 10:00 AM - 11:00 AM",
    venue: "Room no 202, BMSCCM",
    rules: [
      "Theme given on the spot",
      "Poem must have at least 3 verses",
      "College ID is mandatory",
      "Judges' decision is final"
    ],
    coordinators: ["Padmashree - 8050685380", "Sushanth - 9113297502"]
  },
  {
    day: "Day 2",
    title: "500 Mile",
    subtitle: "Start Up 500",
    registration: 500,
    prize: "Total earnings minus investment",
    participants: "2 Participants per team",
    dateTime: "5th April 2025 | 10:00 AM - 11:00 AM",
    venue: "Terrace, BMSCCM",
    rules: [
      "Each team gets Rs. 500 as startup capital",
      "Earn profit by selling/reselling within college",
      "Team with highest profit wins",
      "College ID is mandatory",
      "Judges' decision is final"
    ],
    coordinators: ["Sanjana Prasad - 9740599800", "Trisha B - 6361146658"]
  },
  {
    day: "Day 2",
    title: "Gadyapatana Spardha",
    subtitle: "",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    timeLimit: "Maximum of two minutes per participant",
    dateTime: "5th April 2025 | 11:30 AM - 12:30 PM",
    venue: "Room No.204, BMSCCM",
    rules: [
      "Participants read paragraphs from Banabhatta's Kadambari; judged on pronunciation and fluency",
      "College ID card is mandatory",
      "Judges' decision is final and binding"
    ],
    coordinators: ["Mohith - 6360318559", "Pramati - 6360714734"]
  },
  {
    day: "Day 2",
    title: "Bon Appetit",
    subtitle: "Flameless Cooking",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "2 Participants per team",
    timeLimit: "1 hour",
    dateTime: "5th April 2025 | 1:00 PM - 2:00 PM",
    venue: "Room No 304, BMSCCM",
    rules: [
      "No precooked or precut ingredients allowed",
      "Display a chart of used ingredients",
      "Only vegetarian dishes",
      "No electric equipment allowed",
      "College ID is mandatory",
      "Judges decision is final"
    ],
    coordinators: ["Kanishka Priya - 9901472913", "Mourya - 9482161446"]
  },
  {
    day: "Day 2",
    title: "Curio",
    subtitle: "General Quiz",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "2 Participants per team",
    topics: "Business, current affairs, pop culture, sports, general awareness",
    dateTime: "5th April 2025 | 1:30 PM - 3:30 PM",
    venue: "Seminar Hall, BMSCCM",
    rules: [
      "20-question written prelim round",
      "top 6 teams advance to stage final (same day)",
      "Final details (rounds, scoring, rules) to be briefed by Quizmaster on the day",
      "College ID is mandatory",
      "Judges' decision is final"
    ],
    coordinators: ["Shubhada - 8310562363", "Jishnu - 9845911397"]
  },
  {
    day: "Day 2",
    title: "Bhagavadgita Vaachana Spardha",
    subtitle: "",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    timeLimit: "4 + 1 minutes",
    dateTime: "5th April 2025 | 2:00 PM - 4:00 PM",
    venue: "Room No 301, BMSCCM",
    rules: [
      "Recite any 10 Shlokas from the Bhagavad Gita with meaning in English/Kannada",
      "Judged on pronunciation, meaning accuracy, and fluency",
      "College ID is mandatory",
      "Judges' decision is final"
    ],
    coordinators: ["Mohith - 6360318559", "Pramati - 6360714734"]
  },
  {
    day: "Day 2",
    title: "Matrix Run",
    subtitle: "",
    registration: 1000,
    prize: "5,000 + Trophy",
    participants: "2 Participants per team",
    timeLimit: "2 hours",
    dateTime: "5th April 2025 | 2:00 PM - 4:00 PM",
    venue: "Ground floor lab, BMSCCM",
    rules: [
      "No Internet or electronics allowed",
      "Teams compete in Multiple rounds, highest scorer wins",
      "Teams will navigate through a series of tech-inspired puzzles description challenges and engaging tasks",
      "College ID required",
      "Judges' decision is final"
    ],
    coordinators: ["Punith - 7676746179", "Sanvi - 9902467119"]
  },
  {
    day: "Day 2",
    title: "Chitra Spardhe",
    subtitle: "",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    timeLimit: "Maximum of 60 minutes per participant",
    topic: "Will be given 10 minutes before the competition",
    dateTime: "5th April 2025 | 3:00 PM - 4:00 PM",
    venue: "Room No.302, BMSCCM",
    rules: [
      "Participants must bring their own Art supplies",
      "Judges' decision is final and binding",
      "College ID card is mandatory"
    ],
    coordinators: ["Gunashree - 9916017002", "Pramati - 8618444596"]
  },
  {
    day: "Day 2",
    title: "Treasure Hunt",
    subtitle: "",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "Individual event",
    rules: [
      "Multiple elimination rounds will happen",
      "First team to solve wins",
      "College ID card is mandatory",
      "Judges decision is final and binding"
    ],
    dateTime: "5th April 2025 | 4:00 PM - 5:00 PM",
    venue: "Ground, BMSECAC",
    coordinators: ["Padmashree - 8050685380", "Sushanth - 9113297502"]
  },
  {
    day: "Day 2",
    title: "Tug of War",
    subtitle: "",
    registration: 500,
    prize: "2,000 + Trophy",
    participants: "8 Participants per team",
    rules: [
      "Weight Limit for Boys is 640kg and Girls is 480kg",
      "No change after weighing",
      "Pull only underarm",
      "Best of 3 pulls will be evaluated"
    ],
    dateTime: "5th April 2025 | 5:00 PM - 6:00 PM",
    venue: "Ground, BMSECAC",
    coordinators: ["Shivaprasad - 6360685357", "Divyashree - 8431746212"]
  },
  {
    day: "Day 2",
    title: "Best Physique",
    subtitle: "",
    registration: 500,
    prize: "5,000 + Trophy",
    participants: "Individual event",
    rules: [
      "Judges' decision is final and binding",
      "College ID card is mandatory"
    ],
    dateTime: "5th April 2025 | 5:00 PM - 6:30 PM",
    venue: "Amphitheatre, BMSCCM",
    coordinators: ["Monish - 6366333994", "Hithesh - 7899877081", "M. Gaurav - 829636507"]
  },
  {
    day: "Day 2",
    title: "Vogue Alley",
    subtitle: "Fashion Show",
    registration: 500,
    prize: "21,000 + Trophy",
    participants: "8 to 12 Participants per team",
    rules: [
      "No vulgarity will be tolerated",
      "Music should be provided via pen drive",
      "Props are allowed",
      "College ID card is mandatory",
      "Judges decision is final and binding"
    ],
    dateTime: "5th April 2025 | 6:30 PM - 8:00 PM",
    venue: "Amphitheatre, BMSECAC",
    coordinators: ["Sagar R - 8971105884", "Sanjana - 9902802504"]
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");

    await Event.deleteMany({});
    console.log("Old events removed.");

    await Event.insertMany(events);
    console.log("Events inserted!");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedDB();
console.log('MONGO_URI:', MONGO_URI);
