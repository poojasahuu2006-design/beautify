import fs from 'fs';

const categories = [
    "Lipsticks", "Eyeshadows", "Skincare", "Fragrances", "Hair Care",
    "Foundations", "Tools & Brushes", "Nail Polish"
];

const adjectives = ["Radiant", "Velvet", "Botanical", "Luxury", "Royal", "Matte", "Absolute", "Eternal"];
const nouns = {
    "Lipsticks": ["Matte Lipstick", "Liquid Lip Color", "Gloss Tint", "Satin Rouge"],
    "Eyeshadows": ["Bronze Palette", "Liquid Shadow", "Shimmer Pigment", "Smokey Quad"],
    "Skincare": ["Hydrating Serum", "Vitamin C Oil", "Night Repair Cream", "Rose Exfoliator"],
    "Fragrances": ["Eau de Parfum", "Rollerball Perfume", "Floral Mist", "Amber Extract"],
    "Hair Care": ["Argan Shampoo", "Deep Repair Mask", "Scalp Serum", "Leave-in Conditioner"],
    "Foundations": ["Liquid Foundation", "Matte BB Cream", "Luminous CC Cream", "Skin Tint"],
    "Tools & Brushes": ["Powder Brush", "Beauty Sponge", "Contour Brush", "Rose Quartz Roller"],
    "Nail Polish": ["Classic Red Polish", "Gel Top Coat", "Cuticle Oil", "Matte Polish"]
};

const collageCategories = {
    "Lipsticks": "/uploads/lipsticks.png",
    "Eyeshadows": "/uploads/eyeshadows.png",
    "Skincare": "/uploads/skincare.png",
    "Nail Polish": "/uploads/nail_polish.png",
    "Tools & Brushes": "/uploads/tools.png",
    "Foundations": "/uploads/foundations.png",
    "Fragrances": "/uploads/fragrances.png",
    "Hair Care": "/uploads/hair_care.png"
};

let products = [];
let idCounter = 1;

categories.forEach((category) => {
    const uploadImage = collageCategories[category];

    for (let i = 0; i < 4; i++) {
        const noun = nouns[category][i];
        const adj = adjectives[i % adjectives.length];
        const price = (Math.floor(Math.random() * 60) + 10) + 0.99;

        products.push({
            id: idCounter++,
            name: `${adj} ${noun}`,
            description: `Premium quality ${noun.toLowerCase()} exclusively tailored for you.`,
            price: price,
            category: category,
            image: uploadImage,
            cropIndex: i
        });
    }
});

fs.writeFileSync('./src/utils/mockData.js', `export const products = ${JSON.stringify(products, null, 2)};\n`);
console.log('Successfully fully mapped 8 local user screenshot uploads!');
