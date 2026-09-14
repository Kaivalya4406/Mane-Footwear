import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
const brands = [
  { id: "bata", name: "Bata" },
  { id: "paragon", name: "Paragon" },
  { id: "sparx", name: "Sparx" },
  { id: "lakhani", name: "Lakhani" },
  { id: "woodland", name: "Woodland" },
  { id: "red-chief", name: "Red Chief" },
  { id: "walkaroo", name: "Walkaroo" },
  { id: "lancer", name: "Lancer" },
  { id: "medifeet", name: "Medifeet" },
];

const collections = [
  { id: "mens", name: "Men's Footwear", description: "Formal, casual and everyday styles for men.", iconKind: "formal" },
  { id: "womens", name: "Women's Footwear", description: "Comfortable and stylish footwear for women.", iconKind: "sandal" },
  { id: "kids", name: "Kids' Footwear", description: "Durable, playful footwear built for young feet.", iconKind: "kids" },
  { id: "school", name: "School Shoes", description: "Reliable, all-day school footwear.", iconKind: "boot" },
  { id: "sports", name: "Sports & Running", description: "Supportive footwear for sport and everyday activity.", iconKind: "sneaker" },
  { id: "leather", name: "Leather Collection", description: "Genuine leather footwear crafted to last.", iconKind: "leather" },
];

const products = [
  { id: "formal-oxford", name: "Classic Formal Oxford", category: "Formal Shoes", collectionId: "mens", price: "From ₹1,499", badge: "Popular", iconKind: "formal", isDemo: true, description: "A clean, classic oxford silhouette designed for formal wear and everyday office use." },
  { id: "comfort-sneakers", name: "Everyday Comfort Sneakers", category: "Sports & Running", collectionId: "sports", price: "From ₹1,299", badge: "New", iconKind: "sneaker", isDemo: true, description: "A comfortable everyday sneaker suited for casual wear and light activity." },
  { id: "kids-school-shoes", name: "Kids School Shoes", category: "School Shoes", collectionId: "school", price: "From ₹699", iconKind: "kids", isDemo: true, description: "A comfortable school shoe designed for regular school-day wear." },
  { id: "womens-ballet-flats", name: "Women's Ballet Flats", category: "Women's Footwear", collectionId: "womens", price: "From ₹899", iconKind: "sandal", isDemo: true, description: "A comfortable, versatile flat suited for everyday wear." },
  { id: "leather-loafers", name: "Genuine Leather Loafers", category: "Leather Collection", collectionId: "leather", price: "From ₹1,999", badge: "Popular", iconKind: "leather", isDemo: true, description: "A leather loafer designed for a smart-casual look." },
  { id: "casual-sandals", name: "Men's Casual Sandals", category: "Casual Footwear", collectionId: "mens", price: "From ₹599", iconKind: "sandal", isDemo: true, description: "A relaxed, everyday sandal for casual wear." },
  { id: "kids-casual-sneakers", name: "Kids Casual Sneakers", category: "Kids' Footwear", collectionId: "kids", price: "From ₹799", iconKind: "kids", isDemo: true, description: "A comfortable casual sneaker designed for everyday play and school outings." },
];

const branches = [
  { id: "surabhi-footwear", name: "Surabhi Footwear", yearsOfService: "50+ years of service", location: "Jijamata Chowk, Talegaon Dabhade", mapsQuery: "Surabhi Footwear Jijamata Chowk Talegaon Dabhade" },
  { id: "mane-shoes-leather", name: "Mane Shoes & Leather Collection", yearsOfService: "Around 20 years of service", location: "Challa Chowk, near Bhor Vada Pav, Talegaon Dabhade", mapsQuery: "Mane Shoes & Leather Collection Challa Chowk Talegaon Dabhade" },
  { id: "bata-vihan-shoes", name: "Bata Vihan Shoes", yearsOfService: "Around 10 years of service", location: "Near Dkarto Mobile Shop, Maruti Mandir Chowk, Talegaon Dabhade", mapsQuery: "Bata Vihan Shoes Near Dkarto Mobile Shop Maruti Mandir Chowk Talegaon Dabhade" },
];

async function main() {
  for (const brand of brands) {
    await prisma.brand.upsert({ where: { id: brand.id }, update: {}, create: brand });
  }
  for (const collection of collections) {
    await prisma.collection.upsert({ where: { id: collection.id }, update: {}, create: collection });
  }
  for (const product of products) {
    await prisma.product.upsert({ where: { id: product.id }, update: {}, create: product });
  }
  for (const branch of branches) {
    await prisma.branch.upsert({ where: { id: branch.id }, update: {}, create: branch });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });