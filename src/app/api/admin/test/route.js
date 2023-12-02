import SubCategory from "@/backend/model/SubCategory";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import product from "@/Data/product.json";
import { NextResponse } from "next/server";

export async function GET(request) {
  const a = [
    [
      "QuantumCore Processor Unit",
      "quantum computing",
      "advanced processor",
      "lightning-fast performance",
      "electronic devices",
    ],
    [
      "LuminaLED Smart Display",
      "illumination",
      "vibrant colors",
      "dynamic visuals",
      "immersive viewing experience",
    ],
    [
      "PulseTech Health Monitor Kit",
      "health monitoring",
      "real-time sensors",
      "heart rate",
      "SpO2",
    ],
    [
      "SparkWave Audio Amplifier",
      "audio experience",
      "high-performance",
      "crystal-clear sound",
      "electronic devices",
    ],
    [
      "NexGen Logic Gate Set",
      "future of computing",
      "logic circuits",
      "learning",
      "experimenting",
    ],
    [
      "EcoPower Solar Panel Charger",
      "solar energy",
      "charging on the go",
      "eco-friendly",
      "electronic devices",
    ],
    [
      "SmartBreeze Air Conditioner",
      "intelligent air conditioner",
      "personalized comfort",
      "home automation",
      "optimal comfort",
    ],
    [
      "GourmetMaster Food Processor",
      "culinary",
      "meal preparation",
      "versatile",
      "precision and speed",
    ],
    [
      "CrispClean Robot Vacuum",
      "spotless home",
      "effortless cleaning",
      "robot vacuum",
      "precision",
    ],
    [
      "ZenComfort Electric Blanket",
      "warmth and comfort",
      "cozy nights",
      "electric blanket",
      "chilly weather",
    ],
    [
      "AquaSplash Smart Dishwasher",
      "simplify dishwashing",
      "smart dishwasher",
      "kitchen cleanup",
      "convenience",
    ],
    [
      "LuxeLife Espresso Maker",
      "coffee experience",
      "rich and flavorful",
      "espresso maker",
      "brewing",
    ],
    [
      "QuantumView 4K Monitor",
      "stunning visuals",
      "4K monitor",
      "display quality",
      "vibrant",
    ],
    [
      "ProType Mechanical Keyboard",
      "typing experience",
      "mechanical keyboard",
      "tactile feedback",
      "RGB lighting",
    ],
    [
      "SpeedQuest Gaming Mouse",
      "dominate gaming",
      "high-performance mouse",
      "precision",
      "speed",
    ],
    [
      "UltraFlash External SSD",
      "boost storage",
      "lightning-fast data access",
      "external SSD",
      "transfer speeds",
    ],
    [
      "SilentSurge Surge Protector",
      "protect devices",
      "noiseless technology",
      "surge protector",
      "ample outlets",
    ],
    [
      "ErgoStand Laptop Stand",
      "workspace ergonomics",
      "laptop stand",
      "comfortable",
      "healthy computing",
    ],
    [
      "SonicWave Floorstanding Speakers",
      "superior audio",
      "floorstanding speakers",
      "powerful sound",
      "immersive experience",
    ],
    [
      "PortableBeats Bluetooth Speaker",
      "take the party anywhere",
      "compact Bluetooth speaker",
      "rechargeable battery",
      "on-the-go music",
    ],
    [
      "CinemaVibe Surround Sound System",
      "transform living room",
      "cinematic experience",
      "surround sound system",
      "immersive movie night",
    ],
    [
      "BassDrop Subwoofer Module",
      "deep bass vibrations",
      "subwoofer module",
      "low-frequency range",
      "audio setup",
    ],
    [
      "EchoSphere Smart Speaker",
      "smart home integration",
      "voice-controlled smart speaker",
      "convenience",
      "entertainment",
    ],
    [
      "GrooveSync Bookshelf Speakers",
      "sync your tunes",
      "bookshelf speakers",
      "style",
      "audio performance",
    ],
    [
      "QuantumEdge Pro Smartphone",
      "redefine smartphone experience",
      "cutting-edge technology",
      "stunning display",
      "advanced camera capabilities",
    ],
    [
      "PinnacleSnap Camera Phone",
      "capture every moment",
      "brilliance",
      "camera phone",
      "high-resolution imaging",
    ],
    [
      "EcoCharge Power Efficient Phone",
      "stay connected for longer",
      "power-efficient phone",
      "maximize battery life",
      "environmental impact",
    ],
    [
      "SecureX Biometric Phone",
      "prioritize security",
      "biometric phone",
      "data protection",
      "facial recognition",
      "fingerprint scanning",
    ],
    [
      "InfinityView Bezel-Less Display",
      "immerse yourself",
      "InfinityView",
      "bezel-less display",
      "seamless visual experience",
    ],
    [
      "SwiftLink 5G Connectivity",
      "lightning-fast connectivity",
      "SwiftLink",
      "5G connectivity",
      "seamless communication",
    ],
  ];

  await connectDB();
  try {
    const subCategory = await SubCategory.find();
    let id = [];
    const mappedProducts = product.map((product, index) => {
        const productName = product.productName;
        const productTags = a[index % a.length];
      
        return {
          ...product,
          ProductTags: productTags,
        };
      });
      
      console.log(mappedProducts);
    return NextResponse.json(
      { success: true, message: "get-data-successfully", data: mappedProducts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
