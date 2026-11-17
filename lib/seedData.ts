import { Profile } from './types';

export const SEEDED_PROFILES: Profile[] = [
  {
    id: 'p1',
    name: 'Aria Vance',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Arch major who spends 80% of her time in studio and 20% scouting the city’s best iced oat matcha latte. Let’s trade Spotify daylists.',
    city: 'San Francisco, CA',
    college: 'Stanford University',
    interests: ['Architecture', 'Matcha', 'Indie Pop', 'Film 35mm', 'Museums'],
    occupation: 'Architecture Student',
    distance: '3 miles away',
    prompts: [
      { question: 'A non-negotiable for me', answer: 'You must have opinions on typography and playlist transitions.' },
      { question: 'Typical Sunday morning', answer: 'Farmer’s market run, sourdough baking, and pretending to finish my reading.' }
    ]
  },
  {
    id: 'p2',
    name: 'Sarah Chen',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'CS + Design. Obsessed with clean UI, vintage digicams, and late night drives listening to Phoebe Bridgers. If you know how to parallel park, I’m yours.',
    city: 'Berkeley, CA',
    college: 'UC Berkeley',
    interests: ['UI/UX Design', 'Indie Rock', 'Late Night Drives', 'Film Photography', 'Boba'],
    occupation: 'Product Design Intern',
    distance: '5 miles away',
    prompts: [
      { question: 'My simple pleasures', answer: 'Finding an empty coffee shop right before golden hour.' },
      { question: 'We will get along if', answer: 'You don’t judge me for having 14 open tabs of aesthetic furniture.' }
    ]
  },
  {
    id: 'p3',
    name: 'Liam Gallagher',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Guitar player, amateur barista, and climber. Probably making a playlist for a scenario that will never happen.',
    city: 'New York, NY',
    college: 'Columbia University',
    interests: ['Rock Climbing', 'Vinyl Records', 'Coffee Roasting', 'Live Music', 'Literature'],
    occupation: 'English Lit Grad Student',
    distance: '2 miles away',
    prompts: [
      { question: 'The dorkiest thing about me', answer: 'I still collect first-edition sci-fi paperbacks.' }
    ]
  },
  {
    id: 'p4',
    name: 'Ananya Sharma',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80&crop=face',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Bioengineering nerd by day, contemporary dancer by night. Looking for someone to debate whether pineapple on pizza is a civil right.',
    city: 'New Delhi / Bangalore',
    college: 'IIT Delhi',
    interests: ['Contemporary Dance', 'Biotech', 'Podcasts', 'Sunset Walks', 'Board Games'],
    occupation: 'Biotech Undergrad',
    distance: '4 miles away',
    prompts: [
      { question: 'I’m convinced that', answer: 'Life is too short to drink mediocre drip coffee.' }
    ]
  },
  {
    id: 'p5',
    name: 'Mateo Rossi',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Chef in training. If you like fresh handmade pasta and natural wine, our first date is already planned.',
    city: 'New York, NY',
    college: 'Culinary Institute / NYU',
    interests: ['Cooking', 'Natural Wine', 'Italian Food', 'Jazz', 'Cycling'],
    occupation: 'Sous Chef & Pastry Enthusiast',
    distance: '1 mile away',
    prompts: [
      { question: 'Best meal I ever cooked', answer: 'Truffle cacio e pepe on a rainy Tuesday night in Florence.' }
    ]
  },
  {
    id: 'p6',
    name: 'Chloe Bennett',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Psychology researcher studying why people overthink texts. Tell me your most irrational fear.',
    city: 'Los Angeles, CA',
    college: 'UCLA',
    interests: ['Psychology', 'Surfing', 'Thrifting', 'Audiobooks', 'Sunset Chasing'],
    occupation: 'Behavioral Science Student',
    distance: '7 miles away',
    prompts: [
      { question: 'My love language', answer: 'Sending memes that only we two would understand.' }
    ]
  },
  {
    id: 'p7',
    name: 'Maya Patel',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Fintech builder & tennis enthusiast. Always ready for spontaneous road trips or a 7am rally on the court.',
    city: 'Pilani / Bangalore',
    college: 'BITS Pilani',
    interests: ['Tennis', 'Fintech', 'Road Trips', 'Specialty Coffee', 'EDM'],
    occupation: 'Software Engineer',
    distance: '6 miles away',
    prompts: [
      { question: 'A fun fact about me', answer: 'I once solved a Rubik’s cube in under 30 seconds during an exam break.' }
    ]
  },
  {
    id: 'p8',
    name: 'Ethan Brooks',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Mechanical engineering nerd who loves Formula 1, woodworking, and dogs of all shapes and sizes.',
    city: 'Austin, TX',
    college: 'UT Austin',
    interests: ['Formula 1', 'Woodworking', 'Dogs', 'Craft Beer', 'Country Rock'],
    occupation: 'MechEng Undergrad',
    distance: '9 miles away',
    prompts: [
      { question: 'My dream garage', answer: 'A 1993 Porsche 911 and a vintage espresso machine.' }
    ]
  },
  {
    id: 'p9',
    name: 'Zara Al-Mansoor',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Journalism student with a knack for discovering hole-in-the-wall dumpling spots. Teach me something I don’t know.',
    city: 'London / NYC',
    college: 'King’s College London',
    interests: ['Journalism', 'Street Food', 'Foreign Films', 'Thrifting', 'Writing'],
    occupation: 'Feature Writer',
    distance: '3 miles away',
    prompts: [
      { question: 'You should leave a comment if', answer: 'You know where to find the crispest scallion pancakes in the city.' }
    ]
  },
  {
    id: 'p10',
    name: 'Lucas Silva',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Brazilian in tech. Passionate about bossa nova, soccer on Sunday afternoons, and building open-source tools.',
    city: 'Seattle, WA',
    college: 'University of Washington',
    interests: ['Bossa Nova', 'Soccer', 'Open Source', 'Samba', 'Pour Over Coffee'],
    occupation: 'Backend Developer',
    distance: '4 miles away',
    prompts: [
      { question: 'A life goal of mine', answer: 'To attend the World Cup final with someone who screams as loud as I do.' }
    ]
  },
  {
    id: 'p11',
    name: 'Elena Rostova',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Classical pianist exploring modular synthesizers. Fluent in English, Russian, and sarcasm.',
    city: 'Boston, MA',
    college: 'Berklee College of Music',
    interests: ['Piano', 'Synthesizers', 'Music Production', 'Art Galleries', 'Black Coffee'],
    occupation: 'Pianist & Sound Designer',
    distance: '8 miles away',
    prompts: [
      { question: 'I’m looking for', answer: 'Someone who listens to albums from start to finish without shuffling.' }
    ]
  },
  {
    id: 'p12',
    name: 'Kabir Verma',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Economics grad, part-time stand-up comic, full-time believer that hot sauce belongs on everything.',
    city: 'Mumbai, India',
    college: 'St. Xavier’s College',
    interests: ['Stand-up Comedy', 'Economics', 'Street Photography', 'Spicy Food', 'Podcasts'],
    occupation: 'Risk Analyst',
    distance: '2 miles away',
    prompts: [
      { question: 'My worst habit', answer: 'Testing out new comedy material on innocent Uber drivers.' }
    ]
  },
  {
    id: 'p13',
    name: 'Priya Nair',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Design student at RISD. Can usually be found covered in clay in the ceramic studio or reorganizing my vinyl collection.',
    city: 'Providence, RI',
    college: 'RISD',
    interests: ['Ceramics', 'Vinyl', 'Typography', 'Flea Markets', 'Croissants'],
    occupation: 'Ceramics & Industrial Design',
    distance: '6 miles away',
    prompts: [
      { question: 'Together we could', answer: 'Hunt for mid-century modern lamps at 6am estate sales.' }
    ]
  },
  {
    id: 'p14',
    name: 'Noah Sterling',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Wilderness guide and landscape photographer. If we match, you are legally required to go on a hike with me.',
    city: 'Boulder, CO',
    college: 'CU Boulder',
    interests: ['Hiking', 'Trail Running', 'Camping', 'Landscape Photography', 'Dark Roast'],
    occupation: 'Outdoor Guide',
    distance: '12 miles away',
    prompts: [
      { question: 'Two truths and a lie', answer: 'Summited 14 fourteeners, survived a bear encounter, can cook minute rice in 58 seconds.' }
    ]
  },
  {
    id: 'p15',
    name: 'Sophia Laurent',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Film major at NYU Tisch. Writing a screenplay about people who fall in love on subway delays. Very approachable!',
    city: 'New York, NY',
    college: 'NYU Tisch',
    interests: ['Film Scoring', 'French Cinema', 'Screenwriting', 'Analog Synths', 'Coffee'],
    occupation: 'Film Undergrad',
    distance: '1 mile away',
    prompts: [
      { question: 'A movie I will never get tired of', answer: 'Before Sunrise, no debate.' }
    ]
  },
  {
    id: 'p16',
    name: 'Rohan Joshi',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Data scientist who uses machine learning to predict cricket scores. Unapologetic tea snob.',
    city: 'Pune / Mumbai',
    college: 'COEP Tech',
    interests: ['Cricket', 'Machine Learning', 'Masala Chai', 'Badminton', 'Sci-Fi'],
    occupation: 'Data Scientist',
    distance: '4 miles away',
    prompts: [
      { question: 'Teach me', answer: 'How to make pasta without setting off the smoke detector.' }
    ]
  },
  {
    id: 'p17',
    name: 'Aarav Gupta',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Aerospace student building model rockets. Always down for late night drives and deep conversations about the universe.',
    city: 'Hyderabad, India',
    college: 'IIT Hyderabad',
    interests: ['Aerospace', 'Astronomy', 'Late Night Drives', 'Acoustic Guitar', 'Chess'],
    occupation: 'Aerospace Engineering',
    distance: '5 miles away',
    prompts: [
      { question: 'My ideal Sunday', answer: 'Stargazing far away from city light pollution with warm chai.' }
    ]
  },
  {
    id: 'p18',
    name: 'Emma Lindqvist',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Exchange student from Stockholm. Missing cardamom buns and snowy forests, but loving sunny afternoons here.',
    city: 'Chicago, IL',
    college: 'Northwestern University',
    interests: ['Cardamom Buns', 'Architecture', 'Sailing', 'Scandi Design', 'Cycling'],
    occupation: 'Urban Planning Exchange',
    distance: '8 miles away',
    prompts: [
      { question: 'The secret to my heart', answer: 'Fika culture — coffee and fresh pastry breaks are mandatory.' }
    ]
  },
  {
    id: 'p19',
    name: 'Julian Mercer',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Architectural designer with a mild obsession with brutalist concrete structures and pour-over chemistry.',
    city: 'Toronto, Canada',
    college: 'University of Toronto',
    interests: ['Brutalist Architecture', 'Chemex', 'City Sketching', 'Synthwave', 'Running'],
    occupation: 'Junior Architect',
    distance: '3 miles away',
    prompts: [
      { question: 'I will pick the restaurant if', answer: 'You promise to let me photograph the interior first.' }
    ]
  },
  {
    id: 'p20',
    name: 'Samira Khan',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Pre-law student passionate about civil rights and finding the best brunch in every neighborhood. 10/10 witty banter guaranteed.',
    city: 'Washington, DC',
    college: 'Georgetown University',
    interests: ['Debate', 'Mock Trial', 'Brunch', 'Historical Nonfiction', 'Running'],
    occupation: 'Pre-Law Student',
    distance: '4 miles away',
    prompts: [
      { question: 'Best way to win an argument with me', answer: 'Bring cited sources and an almond croissant.' }
    ]
  },
  {
    id: 'p21',
    name: 'Kai Nakamura',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Game developer and pixel artist. Working on an indie RPG about cats running a ramen shop.',
    city: 'Tokyo / SF',
    college: 'Waseda / CMU',
    interests: ['Game Dev', 'Pixel Art', 'Ramen', 'Japanese Jazz', 'Mechanical Keyboards'],
    occupation: 'Indie Game Developer',
    distance: '6 miles away',
    prompts: [
      { question: 'A quick way to make me smile', answer: 'Show me pictures of your pets.' }
    ]
  },
  {
    id: 'p22',
    name: 'Olivia Martinez',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Environmental science student. I can identify 40 tree species by their bark and I will test you on our walks.',
    city: 'Portland, OR',
    college: 'Reed College',
    interests: ['Botany', 'Thrifting', 'Folk Music', 'Camping', 'Sourdough'],
    occupation: 'Ecology Student',
    distance: '10 miles away',
    prompts: [
      { question: 'The award for most wholesome hobby goes to', answer: 'Pressing wild flowers into old books.' }
    ]
  },
  {
    id: 'p23',
    name: 'Marcus Thorne',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Track & field athlete turned biomechanics researcher. Competitive at Mario Kart and board games.',
    city: 'Atlanta, GA',
    college: 'Georgia Tech',
    interests: ['Sprinting', 'Biomechanics', 'Mario Kart', 'Smoothies', 'Hip Hop'],
    occupation: 'Biomechanics Researcher',
    distance: '5 miles away',
    prompts: [
      { question: 'Don’t challenge me in', answer: 'Rainbow Road on Mario Kart Wii.' }
    ]
  },
  {
    id: 'p24',
    name: 'Tara Mehta',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Literature and creative writing student. Writing my first novel; come be the character I haven’t figured out yet.',
    city: 'Cambridge, MA',
    college: 'Harvard University',
    interests: ['Creative Writing', 'Bookstores', 'Poetry', ' Earl Grey Tea', 'Museums'],
    occupation: 'Creative Writing Fellow',
    distance: '2 miles away',
    prompts: [
      { question: 'The most romantic gesture', answer: 'Annotating a book before giving it to someone.' }
    ]
  },
  {
    id: 'p25',
    name: 'Leo Duarte',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Sound engineer and drummer. Currently on tour with a local indie band or soldering audio cables in the basement.',
    city: 'Nashville, TN',
    college: 'Belmont University',
    interests: ['Drumming', 'Audio Engineering', 'Live Gigs', 'Vintage Mics', 'Tacos'],
    occupation: 'Studio Sound Tech',
    distance: '7 miles away',
    prompts: [
      { question: 'I know the best spot in town for', answer: 'Late night fish tacos after a loud live show.' }
    ]
  },
  {
    id: 'p26',
    name: 'Divya Sen',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Cognitive neuroscience major studying memory and dreams. Yes, I will analyze what your recurring dreams mean.',
    city: 'Philadelphia, PA',
    college: 'UPenn',
    interests: ['Neuroscience', 'Dream Journaling', 'Pilates', 'Iced Americano', 'Indie Cinema'],
    occupation: 'Neuroscience Undergrad',
    distance: '3 miles away',
    prompts: [
      { question: 'First round is on me if', answer: 'You remember the name of your kindergarten teacher.' }
    ]
  },
  {
    id: 'p27',
    name: 'Jordan Rivera',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Product manager by day, bouldering addict by night. Always down to try a new spicy food challenge.',
    city: 'San Francisco, CA',
    college: 'UC San Diego',
    interests: ['Bouldering', 'Product Management', 'Spicy Food', 'Tech Pods', 'Sneakers'],
    occupation: 'Associate Product Manager',
    distance: '4 miles away',
    prompts: [
      { question: 'The key to my heart is', answer: 'A V6 boulder send followed by extra spicy ramen.' }
    ]
  },
  {
    id: 'p28',
    name: 'Meera Chawla',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Fashion marketing student. Lover of oversized blazers, film cameras, and discovering new soul & funk tracks.',
    city: 'London / Mumbai',
    college: 'London College of Fashion',
    interests: ['Vintage Fashion', 'Soul Music', 'Film Photography', 'Art Museums', 'Baking'],
    occupation: 'Fashion Marketing Intern',
    distance: '5 miles away',
    prompts: [
      { question: 'My golden rule', answer: 'Never wear uncomfortable shoes just because they look good.' }
    ]
  },
  {
    id: 'p29',
    name: 'Alexandre Moreau',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Film photographer and coffee enthusiast from Montreal. If you like quiet record shops and long walks, say hi.',
    city: 'Montreal, Canada',
    college: 'McGill University',
    interests: ['Photography', 'French Cinema', 'Record Collecting', 'Cycling', 'Espresso'],
    occupation: 'Visual Arts Student',
    distance: '11 miles away',
    prompts: [
      { question: 'I’m convinced that', answer: 'Old bookstores smell better than luxury perfume.' }
    ]
  },
  {
    id: 'p30',
    name: 'Natasha Volkova',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Robotics engineer building autonomous drones. When not in the lab, I’m probably practicing figure skating.',
    city: 'Pittsburgh, PA',
    college: 'Carnegie Mellon University',
    interests: ['Robotics', 'Figure Skating', 'Drone Racing', 'Coffee', 'Science Fiction'],
    occupation: 'Robotics Undergrad',
    distance: '8 miles away',
    prompts: [
      { question: 'My simple pleasures', answer: 'Gliding on freshly smoothed ice at 6 in the morning.' }
    ]
  },
  {
    id: 'p31',
    name: 'Carlos Mendez',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Salsa dancer and mobile developer. Looking for a partner on the dance floor and someone to try spicy street tacos with.',
    city: 'Miami, FL',
    college: 'University of Miami',
    interests: ['Salsa Dancing', 'Mobile Dev', 'Street Tacos', 'Beach Volleyball', 'Reggaeton'],
    occupation: 'iOS Developer',
    distance: '3 miles away',
    prompts: [
      { question: 'I’ll teach you', answer: 'How to salsa step without stepping on my toes.' }
    ]
  },
  {
    id: 'p32',
    name: 'Sanya Reddy',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Philosophy & Math double major. If you enjoy late-night paradoxes and homemade blueberry pancakes, we will vibe.',
    city: 'Ithaca, NY',
    college: 'Cornell University',
    interests: ['Philosophy', 'Mathematics', 'Pancakes', 'Chess', 'Indie Folk'],
    occupation: 'Math & Philosophy Student',
    distance: '4 miles away',
    prompts: [
      { question: 'A paradox I think about daily', answer: 'Ship of Theseus, but applied to our college identities.' }
    ]
  }
];

/**
 * Secret inbound likes (profiles who have already liked the logged-in user).
 * Guaranteed matches upon swiping right:
 * p2: Sarah Chen (2nd card) -> Quick demo match!
 * p4: Ananya Sharma
 * p7: Maya Patel
 * p10: Lucas Silva
 * p13: Priya Nair
 * p16: Rohan Joshi
 * p20: Samira Khan
 * p24: Tara Mehta
 * p28: Meera Chawla
 * p31: Carlos Mendez
 */
export const INITIAL_INBOUND_LIKES: string[] = [
  'p2',
  'p4',
  'p7',
  'p10',
  'p13',
  'p16',
  'p20',
  'p24',
  'p28',
  'p31'
];

