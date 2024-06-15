const mongoose = require("mongoose"); // Import Mongoose

// Database connection URL
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// Set up Schema and model
const flowerSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});
const Flower = mongoose.model("Flower", flowerSchema);

// MongoDB Functions

async function connect() {
    await mongoose.connect(dbUrl);
}

// Get all flowers from the flowers collection
async function getFlowers() {
    await connect();
    // Return all flowers sorted by name
    return await Flower.find({}).sort({ name: 1 });
}

// Initialize flowers collection with some data
async function initializeFlowers() {
    const flowerList = [
        { 
            name: 'Rose Delight',
            description: 'A beautiful arrangement of red roses.', 
            price: 49.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/R5544D_LOL_preset_proflowers-mx-tile-wide-sv-new.jpg?v=1705430064&width=768' 
        },
        { 
            name: 'Sunflower Bliss', 
            description: 'A sunny bouquet of bright sunflowers.', 
            price: 39.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/t/1/assets/FB69_LOL_preset_proflowers-mx-hero-sv-new.jpeg?v=1664558626&width=768' 
        },
        { 
            name: 'Tulip Charm', 
            description: 'A charming mix of colorful tulips.', 
            price: 54.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/ETLP30NV_LAY_preset_proflowers-mx-tile-wide-sv-lay.jpg?v=1703112254&width=768' 
        },
        { 
            name: 'Lavender Dream', 
            description: 'Relaxing lavender bouquet.', 
            price: 35.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/t/1/assets/PRLAV24_LOL_preset_proflowers-mx-tile-wide-sv-new.jpeg?v=1681309962&width=768' 
        },
        { 
            name: 'Daisy Delight', 
            description: 'Cheerful daisy arrangement.', 
            price: 28.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/CJAD_LOL_preset_proflowers-mx-tile-wide-sv-new.jpg?v=1707737722&width=768' 
        },
        { 
            name: 'Orchid Elegance', 
            description: 'Elegant orchid display.', 
            price: 55.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/P4214_LOL_preset_proflowers-mx-tile-wide-sv-new.jpg?v=1708515853&width=768' 
        },
        { 
            name: 'Carnation Cascade', 
            description: 'Cascade of colorful carnations.', 
            price: 31.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/R5548D_LOL_preset_proflowers-mx-tile-wide-sv-new.jpg?v=1703828186&width=768' 
        },
        { 
            name: 'Peony Perfection', 
            description: 'Perfect peony arrangement.', 
            price: 47.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/FM045D_LOL_preset_proflowers-mx-tile-wide-sv-new.jpg?v=1715872807&width=768' 
        },
        { 
            name: 'Lily Love', 
            description: 'Show your love with lilies.', 
            price: 38.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/YAC03_preset_proflowers-mx-tile-wide-sv-old.jpg?v=1717651031&width=768' 
        },
        { 
            name: 'Hydrangea Heaven', 
            description: 'Heavenly hydrangea bouquet.', 
            price: 46.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/YAC00_preset_proflowers-mx-tile-wide-sv-old.jpg?v=1717650488&width=768' 
        },
        { 
            name: 'Iris Inspiration', 
            description: 'Inspiring iris arrangement.', 
            price: 48.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/S5321D_LOL_preset_proflowers-mx-tile-wide-sv-new.jpg?v=1688133451&width=768' 
        },
        { 
            name: 'Gardenia Glamour', 
            description: 'Glamorous gardenia display.', 
            price: 61.99, 
            image: 'https://cdn.shopify.com/s/files/1/0507/3754/5401/files/YAC10_preset_proflowers-mx-tile-wide-sv-old.jpg?v=1717651293&width=768' 
        }
    ];
    await Flower.insertMany(flowerList);
    console.log(flowerList);
}

// Function to add a flower to the flowers collection
async function createFlower(name, description, price, image) {
    await connect();
    const newFlower = new Flower({
      name,
      description,
      price,
      image,
    });
    await newFlower.save();  // This is the line which actually saves new flower to the DB
    console.log("New flower added:", newFlower);
  }

module.exports = {
    getFlowers,
    initializeFlowers,
    createFlower
};
