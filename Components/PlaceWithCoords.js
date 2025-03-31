
const PLACES_WITH_COORDS = [
    {
      id: 1,
      name: 'Halifax Public Gardens',
      rating: 5.0,
      schedule: '8:00–20:00',
      address: 'Spring Garden Road South Park St, Halifax, Nova Scotia B3J 3S9 Canada',
      description: `
  Beautifully organized garden with a variety of decorative botanical species, well-composed flower beds, rare and exotic plants, well-tended shrubs, a pleasant pond with ducks, a high-quality lawn, and some very old majestic trees reminiscent of the tree from Lewis Carroll's "Alice in Wonderland." There is also a small canal leading from the pond with a charming bridge offering a view of a small fountain and the residence of an old serious goose.
  However, the garden closes too early in the summer evenings, and the cafe with ice cream at the main entrance operates on a very strange schedule. The reviews from visitors on TripAdvisor reflect the beauty and tranquility of the garden, making it a perfect place for walks, relaxation, and enjoying nature. If you need assistance with something specific related to this text or any other task, feel free to ask!
  Reviews Good!
      `,
      defaultReviews: [
        {
          user: 'Victor Gerasimov',
          rating: 5,
          text: `This city park is located about one square block in Halifax, about a 20-minute walk from the cruise terminal and a 5-minute walk from the Citadel. The park has beautiful flowers and a beautiful gazebo, with a small lake and lots of benches. A good place to spend a relaxing time. It's not crowded, but it's not empty either. It's a very pleasant place.`,
        },
        {
          user: 'Loretta Wilson',
          rating: 4,
          text: `The Gardens are a guided hill walk from the cruise terminal. The park is very attractive and well designed and maintained. It's close to the Citadel and gives you some nice views of the city.`,
        },
      ],
      category: 'Nature',
      coords: { latitude: 44.646, longitude: -63.57 },
      image: require('../assets/photo1.png'),
      favorite: false,
    },
    {
      id: 2,
      name: 'Cabot Trail',
      rating: 4.0,
      schedule: '—',
      address: '20T 673381.37124117 5150471.2892394',
      description: `
  The Cape Way in Canada is an exciting route offering stunning views of mountains, small coves, waterfalls, and unique craft shops and galleries. Travelers can enjoy numerous hiking trails, cozy restaurants and cafes. The best way to explore the route, according to reviews, is counterclockwise. It is recommended to take a few days to fully enjoy the beauty of this place. The Kabotsky Way impresses with amazing landscapes, interesting places for recreation and photo shoots, as well as opportunities for observing nature. This is a place worth visiting to enjoy the beauty of nature and the tranquility of this amazing route.
      `,
      defaultReviews: [
        {
          user: 'Richard Reid',
          rating: 5,
          text: `We stopped on a beautiful sunny/warm day to make a Cabot Route trip. We decided to make this a stand. We stopped at Mary Ann Falls for the first time. It was worth it! We also visited Cape Breton Highlands National Park. Other stops included Lakies Head, Pleasant Bay, and La Broc Beach.`,
        },
        {
          user: 'Loretta Wilson',
          rating: 4,
          text: `It is very picturesque and mostly unspoiled along the coast and mountainous area. Plenty of places to stop, enjoy nature, eat, or do local craft shopping. I traveled here by motorcycle — an interesting trip!`,
        },
      ],
      category: 'Nature',
      coords: { latitude: 46.644, longitude: -60.575 },
      image: require('../assets/photo2.jpeg'),
      favorite: false,
    },
    {
      id: 3,
      name: 'Victoria Park',
      rating: 5.0,
      schedule: '—',
      address: '29 Park Road, Truro, Nova Scotia B2N 4E5 Canada',
      description: `Victoria Park is a great place for walking and relaxing, especially during the spring thaw, when waterfalls begin to splash water on the rocks, creating a unique effect. The park attracts many visitors with its scenic trails and beautiful waterfalls, offering many opportunities for outdoor activities, picnics, and enjoying nature. It's a great place to spend a weekend or take a short walk after work.
      `,
      defaultReviews: [
        {
          user: 'Ashley Brown',
          rating: 5,
          text: `We had a wonderful day here. There's plenty of parking space, toilets and a cafeteria. We walked up a steep hill to a great waterfall in the woods. Beautiful experience.`,
        },
        {
          user: 'Joseph Wright',
          rating: 5,
          text: `I didn't expect to find a park in Truro! It was wonderful: magnificent waterfalls, well-equipped paths and stairs. A great way to spend a couple of hours.`,
        },
      ],
      category: 'Nature',
      coords: { latitude: 45.364, longitude: -63.279 },
      image: require('../assets/photo3.jpeg'),
      favorite: false,
    },
    {
      id: 4,
      name: 'Oh My Cod',
      rating: 5.0,
      schedule: '8:00–20:00',
      address: '4 Dufferin St., Lunenburg, Nova Scotia, Canada',
      description: `
  Restaurant offers a variety of dishes suitable for vegetarians, vegans, and those who prefer a gluten-free diet. Cooked for lunch and dinner, focusing on fresh seafood specialties.
      `,
      defaultReviews: [
        {
          user: 'Leonard Horton',
          rating: 5,
          text: `Couldn't have chosen a nicer place to celebrate Canada Day. The food was excellent, reasonably priced, and served quickly. Staff was polite and attentive.`,
        },
        {
          user: 'Diana Massey',
          rating: 5,
          text: `We expected good seafood and it didn't disappoint. Mussels were extremely fresh, and the "Oh, my cod" soup was the best I've ever tasted. Great lobster croissant too.`,
        },
      ],
      category: 'Food',
      coords: { latitude: 44.376, longitude: -64.31 },
      image: require('../assets/photo4.jpeg'),
      favorite: false,
    },
    {
      id: 5,
      name: 'Knot Pub',
      rating: 5.0,
      schedule: '8:00–20:00',
      address: 'Spring Garden Rd, Halifax, Nova Scotia B3J 3S9 Canada',
      description: `
  The Restaurant offers a cozy atmosphere and a varied menu featuring Canadian cuisine. There's live music, comfortable seating, local beer, wheelchair access, table service, and more. A wonderful spot to relax.
      `,
      defaultReviews: [
        {
          user: 'Karen Hardy',
          rating: 5,
          text: `We had signature fish and chips, just perfect. Nothing greasy, excellent local beer. Highly recommended.`,
        },
        {
          user: 'Thelma Huff',
          rating: 5,
          text: `Excellent service and delicious, reasonably priced food. A wonderful place to sit, chat, and soak up the vibe of Halifax.`,
        },
      ],
      category: 'Food',
      coords: { latitude: 44.646, longitude: -63.59 },
      image: require('../assets/photo5.jpeg'),
      favorite: false,
    },
    {
      id: 6,
      name: 'Jerry’s Diner',
      rating: 5.0,
      schedule: '8:00–20:00',
      address: '2 North St, Bridgewater, Nova Scotia B4V 2v6 Canada',
      description: `
  A diner, convenience store, and gas station offering American, snack, and Canadian cuisines. Great for breakfast, lunch, dinner, or brunch at affordable prices. Provides a cozy atmosphere with friendly staff.
      `,
      defaultReviews: [
        {
          user: 'Jennifer Rice',
          rating: 5,
          text: `Busy on Sunday morning, waited 15-20 minutes. Friendly staff, delicious breakfast. Omlette was huge and hearty. Decor is standard diner style, but the food is fantastic.`,
        },
        {
          user: 'Melissa Torres',
          rating: 5,
          text: `First time here and won't be the last. Food is super and plentiful, prices are old-school cheap. Great spot!`,
        },
      ],
      category: 'Food',
      coords: { latitude: 44.379, longitude: -64.52 },
      image: require('../assets/photo6.jpeg'),
      favorite: false,
    },
    {
      id: 7,    name: 'Citadel of Halifax',
      rating: 5.0,
      schedule: '9:00–17:00',
      address: '5425 Sackville St, Halifax, Nova Scotia B3J 3Y3 Canada',
      description: `
  Halifax Citadel-Sable Island is a provincial electoral district in Halifax, Nova Scotia, Canada, that elects one member of the Nova Scotia House of Assembly. The citadel impresses with its grandeur and spirit, well-preserved fortifications, and historical exhibits. Great city views.
      `,
      defaultReviews: [
        {
          user: 'Paul Arnold',
          rating: 5,
          text: `Always dreamed of visiting a real citadel. It’s grand, clean, offers a great view of the city. Fantastic historical site!`,
        },
        {
          user: 'Carla Perkins',
          rating: 5,
          text: `We arrived at noon and heard a cannon shot. Beautiful place with interesting history, definitely worth the visit.`,
        },
      ],
      category: 'Museums',
      coords: { latitude: 44.647, longitude: -63.59 },
      image: require('../assets/photo7.jpeg'),
      favorite: false,
    },
    {
      id: 8,
      name: 'Louisbourg Fortress National Historical Landmark',
      rating: 5.0,
      schedule: '9:30–17:00',
      address: '259 Park Service Rd, Louisbourg, Nova Scotia B1C 2L2 Canada',
      description: `
  A national historic site in Cape Breton. Once among the busiest ports in North America with heavy fortifications. Great interactive exhibits about 18th-century life.
      `,
      defaultReviews: [
        {
          user: 'Lorraine Powell',
          rating: 5,
          text: `We spent the entire day here. My teenager who doesn't usually like history found it fascinating. The interactive approach helps you imagine life back then.`,
        },
        {
          user: 'Kristin Washington',
          rating: 5,
          text: `A wonderful way to spend the day. The story and living history re-creations are amazing. Highly recommend adding it to your Nova Scotia trip.`,
        },
      ],
      category: 'Museums',
      coords: { latitude: 45.917, longitude: -59.983 },
      image: require('../assets/photo8.jpeg'),
      favorite: false,
    },
    {
      id: 9,
      name: 'Lone Shieling',
      rating: 5.0,
      schedule: '9:30–17:30',
      address: '24543 Cabot Trail Rd, Cape Breton Highlands NP, Pleasant Bay, Canada',
      description: `
  A Scottish-style hut (bothan) built in 1942, recognized for historical and architectural significance, with a short scenic trail around a mature maple forest. Great interpretive signs about vegetation and local history.
      `,
      defaultReviews: [
        {
          user: 'Annie Porter',
          rating: 5,
          text: `Cute little walk, about 15 minutes. The oldest hardwood forest in the Maritimes, gorgeous to see. Informative signs.`,
        },
        {
          user: 'Tammy Hardy',
          rating: 5,
          text: `A neat stop in Cape Breton, short walk from the lot. Very peaceful and interesting historically.`,
        },
        {
          user: 'Victor Cox',
          rating: 4,
          text: `Just a small stone building to see, but worth the short trail. Info signs about the forest. This one is a partial re-creation of a Scottish bothan.`,
        },
      ],
      category: 'Historical sites',
      coords: { latitude: 46.798, longitude: -60.801 },
      image: require('../assets/photo9.jpeg'),
      favorite: false,
    },
    {
      id: 10,
      name: 'York Redoubt National Historic Site',
      rating: 5.0,
      schedule: '—',
      address: 'Ferguson’s Cove, Nova Scotia, Canada',
      description: `
  A redoubt from 1793 overlooking Halifax Harbour. Designated a National Historic Site in 1962. Good place for scenic walks and picnics, with interpretive panels about its military history.
      `,
      defaultReviews: [
        {
          user: 'Annie Porter',
          rating: 5,
          text: `Great for a walk with the dog, took about 1.5 hours. The best part is exploring the lower battery area.`,
        },
        {
          user: 'Tammy Hardy',
          rating: 4,
          text: `Lovely ocean and city views. Wish the buildings were open, but it's still interesting to learn the history.`,
        },
      ],    category: 'Historical sites',
      coords: { latitude: 44.59, longitude: -63.54 },
      image: require('../assets/photo10.jpeg'),
      favorite: false,
    },
    {
      id: 11,
      name: 'Hunter Coastal Adventure Tour by Boat from Newcastle',
      rating: 5.0,
      schedule: '—',
      address: '3-3A Honeysuckle Dr, Newcastle NSW 2300',
      description: `
  Book ahead for front-row views of the Hunter Coast and its marine life. Photos of your trip are included. Enjoy coastline forts, cliffs, beaches, and watch for dolphins, seabirds, and turtles.
      `,
      defaultReviews: [
        {
          user: 'Lillian Miller',
          rating: 5,
          text: `We have done several tours. The views have to be seen to be believed. Sunny day, scenic coastline, saw plenty of wildlife.`,
        },
        {
          user: 'Charles Johnson',
          rating: 5,
          text: `Absolutely beautiful trip. We saw a pod of dolphins, and the skipper was very informative about the region. Highly recommend!`,
        },
      ],
      category: 'Outdoors',
      coords: { latitude: -32.926, longitude: 151.771 },
      image: require('../assets/photo11.jpeg'),
      favorite: false,
    },
    {
      id: 12,
      name: 'Skydive Sydney-Newcastle up to 15,000ft Tandem Skydive',
      rating: 5.0,
      schedule: '—',
      address: 'Lake Macquarie Airport, 864 Pacific Highway, Marks Point NSW 2280',
      description: `
  Skydive Sydney on a tandem parachute jump with a certified dive master, enjoying views of New South Wales' coastline, lakes, and hinterland. Free-fall at over 130 mph before a peaceful parachute descent. 
      `,
      defaultReviews: [
        {
          user: 'Warren Garner',
          rating: 5,
          text: `Unbelievable day. Amazing experience, must-do in a lifetime. Great video and photos included.`,
        },
        {
          user: 'John Pearson',
          rating: 5,
          text: `Best time jumping last week. Great instructors and staff, beautiful beach landing, can't recommend it enough.`,
        },
      ],
      category: 'Outdoors',
      coords: { latitude: -33.065, longitude: 151.647 },
      image: require('../assets/photo12.jpeg'),
      favorite: false,
    },
    {
      id: 13,
      name: 'Angus L. Macdonald Bridge',
      rating: 5.0,
      schedule: '—',
      address: '44.6637°N 63.5846°W, Halifax Harbour, NS, Canada',
      description: `
  A suspension bridge crossing Halifax Harbour, known locally as "the old bridge," opened in 1955. In 1999, a reversible lane was added. Pedestrians and cyclists have separate paths. Great views of the harbor.
      `,
      defaultReviews: [
        {
          user: 'Linda Brown',
          rating: 5,
          text: `I walked round-trip from Halifax to Dartmouth. Great views, free to walk. The separation of bikes on one side and pedestrians on the other is very convenient.`,
        },
      ],
      category: 'Outdoors',
      coords: { latitude: 44.6637, longitude: -63.5846 },
      image: require('../assets/photo13.jpeg'),
      favorite: false,
    },
  ];
  export default PLACES_WITH_COORDS;