import { createClient } from '@supabase/supabase-js';

const supabaseURL = "https://dohtpnanjiflhnlfszhy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaHRwbmFuamlmbGhubGZzemh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2ODU1MjYsImV4cCI6MjAzMjI2MTUyNn0.iC4Sg2aVTeLQ3zG7RNhSmYvuTcr0bc0LKD9by7zKp6s";

export const supabase = createClient(supabaseURL, supabaseAnonKey);

// Registro de usuario
async function signUp(email, password) {
    try {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return user;
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        throw error;
    }
}

// Inicio de sesión
async function signIn(email, password) {
    try {
        const { user, error } = await supabase.auth.signIn({ email, password });
        if (error) throw error;
        return user;
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        throw error;
    }
}

// Cierre de sesión
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
        throw error;
    }
}

// Almacenar producto
async function guardarProducto(description) {
    try {
        const { data, error } = await supabase.from('productos').insert({ description });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al guardar producto:', error.message);
        throw error;
    }
}

// Obtener productos
async function obtenerProductos() {
    try {
        const { data, error } = await supabase.from('productos').select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        throw error;
    }
}
// Otros imports y código...

// Eliminar producto
async function deleteProduct(productId) {
  try {
      const { data, error } = await supabase
          .from('products')
          .delete()
          .eq('productos', productId);
      if (error) throw error;
      return data;
  } catch (error) {
      console.error('Error al eliminar producto:', error.message);
      throw error;
  }
}

// Actualizar producto
async function updateProduct(productId, newDescription) {
  try {
      const { data, error } = await supabase
          .from('products')
          .update({ description: newDescription })
          .eq('productos', productId);
      if (error) throw error;
      return data;
  } catch (error) {
      console.error('Error al actualizar producto:', error.message);
      throw error;
  }
}

// Exportar todas las funciones necesarias
export { signUp, signIn, signOut, guardarProducto, obtenerProductos, deleteProduct, updateProduct };

