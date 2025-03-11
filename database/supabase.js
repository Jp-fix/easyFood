import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://auasihwlimiprtbgifkx.supabase.co'
//TODO add environnement env (security for supabase key)
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1YXNpaHdsaW1pcHJ0YmdpZmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2OTkwMzEsImV4cCI6MjA1NzI3NTAzMX0.bNVIOvA3jmdjYpHB5qFY6q1Bvf4Ge8EMPWINxUaVfWY"
const supabase = createClient(supabaseUrl, supabaseKey)