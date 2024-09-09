// Mock data (in a real app, this would come from PayloadCMS)
export const occupancyData = [
  { name: "Backpackers Paradise", occupancy: 85 },
  { name: "City Center Hostel", occupancy: 72 },
  { name: "Beachfront Bunk", occupancy: 90 },
  { name: "Mountain View Lodge", occupancy: 58 },
  { name: "Riverside Retreat", occupancy: 78 },
];

export const recentBookings = [
  {
    id: 1,
    name: "John Doe",
    hostel: "Backpackers Paradise",
    checkIn: "2023-06-15",
    nights: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    hostel: "City Center Hostel",
    checkIn: "2023-06-16",
    nights: 2,
  },
  {
    id: 3,
    name: "Mike Johnson",
    hostel: "Beachfront Bunk",
    checkIn: "2023-06-17",
    nights: 5,
  },
];

export const hostels = [
  {
    id: "1",
    name: "Backpackers Paradise",
    currentOccupancy: 42,
    capacity: 50,
    availability: "low",
    description:
      "Located in the heart of the city, Backpackers Paradise offers a comfortable and affordable stay for travelers from all around the world. With modern amenities and a friendly atmosphere, it's the perfect base for exploring the local attractions.",
    amenities: [
      "Free Wi-Fi",
      "24/7 Reception",
      "Communal Kitchen",
      "Laundry Facilities",
      "Bike Rental",
    ],
    nearbyAttractions: [
      "City Park",
      "Museum of Modern Art",
      "Central Market",
      "Historic Downtown",
    ],
  },
  {
    id: "2",
    name: "City Center Hostel",
    currentOccupancy: 28,
    capacity: 30,
    availability: "low",
    description:
      "A cozy and central hostel, perfect for exploring the city's best attractions. Comfortable beds and friendly staff await.",
    amenities: [
      "Free Wi-Fi",
      "Communal Kitchen",
    ],
    nearbyAttractions: [
      "Central Plaza",
      "Shopping District",
    ],
  },
  {
    id: "3",
    name: "Beachfront Bunk",
    currentOccupancy: 35,
    capacity: 40,
    availability: "low",
    description:
      "Located just steps from the beach, Beachfront Bunk is perfect for sun lovers and surfers alike.",
    amenities: [
      "Beach Access",
      "Surfboard Rentals",
    ],
    nearbyAttractions: [
      "Beach Promenade",
      "Oceanfront Restaurants",
    ],
  },
  {
    id: "4",
    name: "Mountain View Lodge",
    currentOccupancy: 14,
    capacity: 25,
    availability: "medium",
    description:
      "Nestled in the mountains, this lodge offers stunning views and a peaceful escape from the city.",
    amenities: [
      "Hiking Trails",
      "Mountain Biking",
    ],
    nearbyAttractions: [
      "National Park",
      "Scenic Overlook",
    ],
  },
  {
    id: "5",
    name: "Riverside Retreat",
    currentOccupancy: 10,
    capacity: 30,
    availability: "high",
    description:
      "Set along the river, Riverside Retreat offers relaxation with nature and easy access to water activities.",
    amenities: [
      "Kayak Rentals",
      "Fishing Access",
    ],
    nearbyAttractions: [
      "River Walk",
      "Boating Dock",
    ],
  },
];

