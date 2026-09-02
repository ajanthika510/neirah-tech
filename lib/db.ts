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
  
  if (process.env.NODE_ENV !== "production") {
    console.log("Executed query", { text: text.trim().slice(0, 60), duration, rows: res.rowCount });
  }
  return res;
}

let dbInitPromise: Promise<void> | null = null;

export async function ensureDb(): Promise<void> {
  if (!dbInitPromise) {
    dbInitPromise = initDb();
  }
  return dbInitPromise;
}

// Function to initialize tables and insert seed data efficiently
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

    // 3. Seed projects if empty (Batch insert)
    const projCount = await query("SELECT COUNT(*) FROM projects");
    if (parseInt(projCount.rows[0].count, 10) === 0) {
      await query(`
        INSERT INTO projects (title, category, country, country_code, status, website, description) VALUES
        ('D Plus Landscaping', 'Landscaping Services', 'USA', 'US', 'Live', 'https://dpluslandscaping.com/', 'Professional landscaping company website with portfolio showcase and service booking system.'),
        ('KK99 Proline', 'Apparel Manufacturing', 'Sri Lanka', 'LK', 'Live', 'https://kk99proline.com/', 'Custom apparel manufacturer platform with order management and design customization tools.'),
        ('Chelmsford Master Cabs', 'Transportation', 'UK', 'GB', 'Live', 'https://chelmsfordmastercabs.com/', 'Taxi booking platform with real-time tracking, fare calculation, and driver management.'),
        ('Kesi Chauffeurs', 'Luxury Transport', 'UK', 'GB', 'Live', 'https://kesichauffeurs.co.uk/', 'Premium chauffeur service platform with luxury vehicle booking and route optimization.'),
        ('David Taxi', 'Transportation', 'Switzerland', 'CH', 'Live', 'https://davidtaxi.com/', 'Swiss taxi service with multilingual support and airport region coverage.'),
        ('Aqua Experts', 'Aquarium Services', 'Norway', 'NO', 'Live', 'https://aqua-experts.org/wexperts/', 'Professional aquarium services with maintenance scheduling and fish care consultation.'),
        ('Mamma Products', 'Health Products', 'Sri Lanka', 'LK', 'Live', 'https://mamma-products.com/', 'Food products e-commerce with subscription management and health tracking.'),
        ('Minlon Solar', 'Renewable Energy', 'Sri Lanka', 'LK', 'Live', 'https://miwonsolar.com/', 'Solar energy solutions with system design calculator and installation management.'),
        ('LS O''Hare Taxi', 'Airport Transportation', 'USA', 'US', 'Live', 'https://ls-oharetaxi.com/lander?oref=https%3A%2F%2Fwww.neirahtech.com%2F', 'Chicago O''Hare airport taxi service with flight tracking and pre-booking system.'),
        ('Nirosh Clean Rent', 'Professional Cleaning Services', 'USA', 'US', 'Live', 'https://niroshcleanrent.com/lander?oref=https%3A%2F%2Fwww.neirahtech.com%2F', 'Professional cleaning service platform with booking system and quality assurance tracking.')
      `);
    }

    // 4. Seed case studies if empty (Batch insert)
    const csCount = await query("SELECT COUNT(*) FROM case_studies");
    if (parseInt(csCount.rows[0].count, 10) === 0) {
      await query(`
        INSERT INTO case_studies (number, category, type, title, subtitle, description, image, year, services) VALUES
        ('01', 'Transportation', 'Web Platform', 'David Taxi', 'Smart Booking Platform', 'A complete digital booking ecosystem designed to simplify taxi reservations, live tracking and customer management.', '/images/case-studies/david-taxi.jpg', '2026', ARRAY['UX/UI', 'Web Development', 'Booking System']),
        ('02', 'Food & Beverage', 'Restaurant Website', 'Sri Lanka Wok', 'Digital Dining Experience', 'A modern restaurant experience combining menu discovery, reservations and online ordering for an authentic Sri Lankan dining brand.', '/images/case-studies/sri-lanka-wok.jpg', '2026', ARRAY['Web Design', 'Development', 'Ordering']),
        ('03', 'Fashion & Retail', 'E-Commerce', 'VRN Pretty Saree', 'E-commerce Excellence', 'A visually rich shopping experience created to showcase traditional Indian fashion through a modern and engaging interface.', '/images/case-studies/vrn-pretty-saree.jpg', '2026', ARRAY['E-Commerce', 'UX/UI', 'Payment']),
        ('04', 'Business', 'Business Website', 'D Plus Landscaping', 'Professional Services Portal', 'A professional digital platform built to communicate expertise, services and completed landscaping projects.', '/images/case-studies/d-plus.jpg', '2026', ARRAY['Brand Website', 'Development', 'SEO'])
      `);
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
