const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function test() {
  // Hardcode dulu untuk test
  const DATABASE_URL = "postgresql://neondb_owner:npg_EC2yvOnGR3lF@ep-twilight-credit-a15vzonm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  
  console.log('DATABASE_URL:', DATABASE_URL);
  
  try {
    const sql = neon(DATABASE_URL);
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Koneksi berhasil:', result);
  } catch (error) {
    console.log('❌ Error:', error.message);
    console.log('Detail error:', error);
  }
}

test();
