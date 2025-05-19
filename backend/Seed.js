// seed.js
const mongoose = require('mongoose');
const TeamMember = require('./models/TeamMember');
const Value = require('./models/Value');

mongoose.connect('mongodb://localhost:27017/cloudkitchen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected for seeding');
  seedData();
}).catch(err => console.error(err));

async function seedData() {
  try {
    // Clear existing data
    await TeamMember.deleteMany({});
    await Value.deleteMany({});

    // Insert Team Members
    const teamMembers = [
      {
        name: "Alex Johnson",
        role: "Head Chef",
        image: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg",
        bio: "With 15 years of culinary experience, Alex brings expertise in international cuisine and a passion for local ingredients."
      },
      {
        name: "Maria Lopez",
        role: "Operations Manager",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        bio: "Maria ensures that our kitchen runs smoothly and efficiently, coordinating orders and managing supply chains."
      },
      {
        name: "David Kim",
        role: "Marketing Specialist",
        image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
        bio: "David leads our marketing efforts, helping us connect with customers and grow our brand."
      }
    ];

    // Insert Values
    const values = [
      {
        icon: "Utensils",
        title: "Culinary Excellence",
        description: "We strive for perfection in every dish, using premium ingredients and meticulous preparation techniques."
      },
      {
        icon: "Coffee",
        title: "Freshness & Quality",
        description: "Only the freshest ingredients make it into our kitchen, guaranteeing superior taste and nutrition."
      },
      {
        icon: "Clock",
        title: "Punctuality",
        description: "We respect your time and ensure every order is prepared and delivered promptly."
      },
      {
        icon: "Users",
        title: "Teamwork",
        description: "Our diverse team works collaboratively to bring you the best culinary experience."
      },
      {
        icon: "Award",
        title: "Customer Satisfaction",
        description: "We measure our success by your happiness and constantly strive to exceed expectations."
      },
      {
        icon: "Phone",
        title: "Communication",
        description: "We're always here to listen and respond quickly to your needs."
      }
    ];

    await TeamMember.insertMany(teamMembers);
    await Value.insertMany(values);

    console.log('Seeding complete!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}
