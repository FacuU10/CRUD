import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseURL = "https://dohtpnanjiflhnlfszhy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaHRwbmFuamlmbGhubGZzemh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2ODU1MjYsImV4cCI6MjAzMjI2MTUyNn0.iC4Sg2aVTeLQ3zG7RNhSmYvuTcr0bc0LKD9by7zKp6s";

export const supabase = createClient(supabaseURL, supabaseAnonKey);

// Registro de usuario
async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    throw error;
  }
}

// Inicio de sesión
async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    throw error;
  }
}

// Almacenar producto
async function guardarProducto(description) {
  try {
    const { data, error } = await supabase.from('products').insert({
      description,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error al guardar producto:', error.message);
    throw error;
  }
}

// Obtener productos
async function obtenerProductos() {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    throw error;
  }
}

export { signUp, signIn, guardarProducto, obtenerProductos };

  