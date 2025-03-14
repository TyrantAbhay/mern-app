import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set ({products}),



    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success: false, message:"Please fill all required fields."}
        }
        const res = await fetch('/api/products/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json()
        set((state) => ({products: [...state.products, data.data]}))
        return {success: true, message:"Product created successfully."}
    },
    
    
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data});
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`,{
            method: 'DELETE',
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};


        //refresh the page when we delete an item
        set(state => ({products: state.products.filter(products => products._id !== pid)})); 
        return {success: true, message:data.message};
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {  // Fixed template literal
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct),
        });
    
        const data = await res.json();
    
        if (!data.success) {
            return { success: false, message: data.message };
        }
    
        // Update product list in Zustand store
        set(state => ({
            products: state.products.map(product => 
                product._id === pid ? data.data : product
            )
        }));
    
        return { success: true, message: data.message }; // Ensure function always returns a result
    }    
}))