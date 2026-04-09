import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zzocsmihgclzftspqcxq.supabase.co';
const supabaseKey = 'sb_publishable_-5yKJ31VRcrjOxgsMqeghg_BMMp6p51';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('🌱 Starting simplified database seed (V5)...');

  // 1. Add Routes
  const routes = [
    { from_city: 'Negele Borena', to_city: 'Addis Ababa', price: 650, duration: '12h 00m', distance: '595 km', active: true },
    { from_city: 'Negele Borena', to_city: 'Hawassa', price: 420, duration: '6h 30m', distance: '320 km', active: true },
    { from_city: 'Negele Borena', to_city: 'Moyale', price: 380, duration: '5h 00m', distance: '240 km', active: true }
  ];

  const { data: routeData, error: routeError } = await supabase.from('routes').insert(routes).select();
  if (routeError) console.error('Error adding routes:', routeError);
  else console.log('✅ Added Routes:', routeData?.length);

  // 2. Add Buses
  const buses = [
    { plate: 'B-NB-102', capacity: 45, status: 'Active' },
    { plate: 'B-NB-882', capacity: 30, status: 'Active' },
    { plate: 'B-NB-554', capacity: 45, status: 'Active' }
  ];

  const { data: busData, error: busError } = await supabase.from('buses').insert(buses).select();
  if (busError) console.error('Error adding buses:', busError);
  else console.log('✅ Added Buses:', busData?.length);

  // 3. Add Bookings (Provide numeric IDs as the app expects)
  const today = new Date();
  const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);

  const mockBookings = [
    { id: '1001', name: 'Dawit Solomon', phone: '0911223344', route: 'Negele Borena → Addis Ababa', date: yesterday.toISOString().split('T')[0] + ', 06:00', amount: 650, status: 'Completed', boarded: true },
    { id: '1002', name: 'Fatuma Mohammed', phone: '0922334455', route: 'Negele Borena → Addis Ababa', date: yesterday.toISOString().split('T')[0] + ', 06:00', amount: 650, status: 'Completed', boarded: true },
    { id: '1003', name: 'Girum Abebe', phone: '0933445566', route: 'Negele Borena → Hawassa', date: yesterday.toISOString().split('T')[0] + ', 07:30', amount: 420, status: 'Completed', boarded: true },
    { id: '1004', name: 'Hirut Tekle', phone: '0944556677', route: 'Negele Borena → Addis Ababa', date: today.toISOString().split('T')[0] + ', 06:00', amount: 650, status: 'Confirmed', boarded: false },
    { id: '1005', name: 'Ibrahim Kedir', phone: '0955667788', route: 'Negele Borena → Addis Ababa', date: today.toISOString().split('T')[0] + ', 06:00', amount: 650, status: 'Confirmed', boarded: true },
    { id: '1006', name: 'Kalkidan Worku', phone: '0977889900', route: 'Negele Borena → Addis Ababa', date: tomorrow.toISOString().split('T')[0] + ', 06:00', amount: 650, status: 'Confirmed', boarded: false }
  ];

  for (const b of mockBookings) {
    const { error } = await supabase.from('bookings').insert([b]);
    if (error) {
       // If ID exists, just move on
       if (error.code === '23505') console.log('⏭️ Skipping existing booking ID:', b.id);
       else console.error('Error adding booking:', b.name, error);
    }
    else console.log('✅ Added Booking:', b.name);
  }

  console.log('✨ Seed completed successfully!');
}

seed();
