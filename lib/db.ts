import { Pool } from "pg";

let pool: Pool;

const connectionString = process.env.DATABASE_URL;

const isLocal =
  !connectionString ||
  connectionString.includes("localhost") ||
  connectionString.includes("127.0.0.1") ||
  connectionString.includes("sslmode=disable");

declare global {
  var pgPool: Pool | undefined;
}

if (process.env.NODE_ENV === "production" && !isLocal) {
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Prevent multiple pools during hot-reloads in development
  if (!globalThis.pgPool) {
    globalThis.pgPool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    });
  }
  pool = globalThis.pgPool;
}

export default pool;

export async function query(text: string, params?: unknown[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query", { text, duration, rows: res.rowCount });
  return res;
}

let dbInitPromise: Promise<void> | null = null;

export async function ensureDb(): Promise<void> {
  if (!dbInitPromise) {
    dbInitPromise = initDb();
  }
  return dbInitPromise;
}

// Function to initialize tables and insert seed data
export async function initDb() {
  try {
    // 1. Create projects table
    await query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        country_code VARCHAR(10) NOT NULL,
        status VARCHAR(50) NOT NULL,
        website TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create case_studies table
    await query(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id SERIAL PRIMARY KEY,
        number VARCHAR(50) NOT NULL,
        category VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        year VARCHAR(10) NOT NULL,
        services TEXT[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Seed projects if empty
    const projCount = await query("SELECT COUNT(*) FROM projects");
    if (parseInt(projCount.rows[0].count, 10) === 0) {
      console.log("Seeding projects data...");
      const seedProjects = [
        {
          title: "D Plus Landscaping",
          category: "Landscaping Services",
          country: "USA",
          country_code: "US",
          status: "Live",
          website: "https://dpluslandscaping.com/",
          description: "Professional landscaping company website with portfolio showcase and service booking system.",
        },
        {
          title: "KK99 Proline",
          category: "Apparel Manufacturing",
          country: "Sri Lanka",
          country_code: "LK",
          status: "Live",
          website: "https://kk99proline.com/",
          description: "Custom apparel manufacturer platform with order management and design customization tools.",
        },
        {
          title: "Chelmsford Master Cabs",
          category: "Transportation",
          country: "UK",
          country_code: "GB",
          status: "Live",
          website: "https://chelmsfordmastercabs.com/",
          description: "Taxi booking platform with real-time tracking, fare calculation, and driver management.",
        },
        {
          title: "Kesi Chauffeurs",
          category: "Luxury Transport",
          country: "UK",
          country_code: "GB",
          status: "Live",
          website: "https://kesichauffeurs.co.uk/",
          description: "Premium chauffeur service platform with luxury vehicle booking and route optimization.",
        },
        {
          title: "David Taxi",
          category: "Transportation",
          country: "Switzerland",
          country_code: "CH",
          status: "Live",
          website: "https://davidtaxi.com/",
          description: "Swiss taxi service with multilingual support and airport region coverage.",
        },
        {
          title: "Aqua Experts",
          category: "Aquarium Services",
          country: "Norway",
          country_code: "NO",
          status: "Live",
          website: "https://aqua-experts.org/wexperts/",
          description: "Professional aquarium services with maintenance scheduling and fish care consultation.",
        },
        {
          title: "Mamma Products",
          category: "Health Products",
          country: "Sri Lanka",
          country_code: "LK",
          status: "Live",
          website: "https://mamma-products.com/",
          description: "Food products e-commerce with subscription management and health tracking.",
        },
        {
          title: "Minlon Solar",
          category: "Renewable Energy",
          country: "Sri Lanka",
          country_code: "LK",
          status: "Live",
          website: "https://miwonsolar.com/",
          description: "Solar energy solutions with system design calculator and installation management.",
        },
        {
          title: "LS O'Hare Taxi",
          category: "Airport Transportation",
          country: "USA",
          country_code: "US",
          status: "Live",
          website: "https://ls-oharetaxi.com/lander?oref=https%3A%2F%2Fwww.neirahtech.com%2F",
          description: "Chicago O'Hare airport taxi service with flight tracking and pre-booking system.",
        },
        {
          title: "Nirosh Clean Rent",
          category: "Professional Cleaning Services",
          country: "USA",
          country_code: "US",
          status: "Live",
          website: "https://niroshcleanrent.com/lander?oref=https%3A%2F%2Fwww.neirahtech.com%2F",
          description: "Professional cleaning service platform with booking system and quality assurance tracking.",
        },
      ];

      for (const proj of seedProjects) {
        await query(
          "INSERT INTO projects (title, category, country, country_code, status, website, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [proj.title, proj.category, proj.country, proj.country_code, proj.status, proj.website, proj.description]
        );
      }
    }

    // 4. Seed case studies if empty
    const csCount = await query("SELECT COUNT(*) FROM case_studies");
    if (parseInt(csCount.rows[0].count, 10) === 0) {
      console.log("Seeding case studies data...");
      const seedCaseStudies = [
        {
          number: "01",
          category: "Transportation",
          type: "Web Platform",
          title: "David Taxi",
          subtitle: "Smart Booking Platform",
          description: "A complete digital booking ecosystem designed to simplify taxi reservations, live tracking and customer management.",
          image: "/images/case-studies/david-taxi.jpg",
          year: "2026",
          services: ["UX/UI", "Web Development", "Booking System"],
        },
        {
          number: "02",
          category: "Food & Beverage",
          type: "Restaurant Website",
          title: "Sri Lanka Wok",
          subtitle: "Digital Dining Experience",
          description: "A modern restaurant experience combining menu discovery, reservations and online ordering for an authentic Sri Lankan dining brand.",
          image: "/images/case-studies/sri-lanka-wok.jpg",
          year: "2026",
          services: ["Web Design", "Development", "Ordering"],
        },
        {
          number: "03",
          category: "Fashion & Retail",
          type: "E-Commerce",
          title: "VRN Pretty Saree",
          subtitle: "E-commerce Excellence",
          description: "A visually rich shopping experience created to showcase traditional Indian fashion through a modern and engaging interface.",
          image: "/images/case-studies/vrn-pretty-saree.jpg",
          year: "2026",
          services: ["E-Commerce", "UX/UI", "Payment"],
        },
        {
          number: "04",
          category: "Business",
          type: "Business Website",
          title: "D Plus Landscaping",
          subtitle: "Professional Services Portal",
          description: "A professional digital platform built to communicate expertise, services and completed landscaping projects.",
          image: "/images/case-studies/d-plus.jpg",
          year: "2026",
          services: ["Brand Website", "Development", "SEO"],
        },
      ];

      for (const cs of seedCaseStudies) {
        await query(
          "INSERT INTO case_studies (number, category, type, title, subtitle, description, image, year, services) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
          [cs.number, cs.category, cs.type, cs.title, cs.subtitle, cs.description, cs.image, cs.year, cs.services]
        );
      }
    }
    // 5. Create messages table
    await query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. Create bookings table for scheduler
    await query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        reference_code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        duration INT NOT NULL DEFAULT 30,
        booking_date DATE NOT NULL,
        booking_time VARCHAR(50) NOT NULL,
        timezone VARCHAR(100) NOT NULL,
        meeting_platform VARCHAR(50) NOT NULL DEFAULT 'Google Meet',
        notes TEXT,
        status VARCHAR(50) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
}
