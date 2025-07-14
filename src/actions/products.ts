"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// Define el tipo para el estado que devuelven las acciones del formulario
type FormState = {
  message: string;
  status: "success" | "error" | "";
};

export async function getProducts() {
  try {
    const products = await prisma.producto.findMany({
      include: {
        categoria: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { error: "Failed to fetch products." };
  }
}

export async function getProductById(id: number) {
  try {
    const product = await prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
      },
    });
    return { product };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return { error: "Failed to fetch product." };
  }
}

export async function createProduct(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const nombre = formData.get("nombre") as string;
  const descripcion = formData.get("descripcion") as string;
  const imagen = formData.get("imagen") as string;
  const precio = Number.parseFloat(formData.get("precio") as string);
  const stock = Number.parseInt(formData.get("stock") as string);
  const idCategoria = Number.parseInt(formData.get("idCategoria") as string);

  if (
    !nombre ||
    !precio ||
    isNaN(precio) ||
    !stock ||
    isNaN(stock) ||
    !idCategoria ||
    isNaN(idCategoria)
  ) {
    return {
      message: "Todos los campos obligatorios deben ser válidos.",
      status: "error",
    };
  }

  try {
    await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        imagen,
        precio,
        stock,
        idCategoria,
      },
    });
    revalidatePath("/productos");
    return { message: "Producto creado exitosamente.", status: "success" };
  } catch (error) {
    console.error("Error creating product:", error);
    return { message: "Error al crear el producto.", status: "error" };
  }
}

export async function updateProduct(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = Number.parseInt(formData.get("id") as string);
  const nombre = formData.get("nombre") as string;
  const descripcion = formData.get("descripcion") as string;
  const imagen = formData.get("imagen") as string;
  const precio = Number.parseFloat(formData.get("precio") as string);
  const stock = Number.parseInt(formData.get("stock") as string);
  const idCategoria = Number.parseInt(formData.get("idCategoria") as string);

  if (
    !id ||
    !nombre ||
    !precio ||
    isNaN(precio) ||
    !stock ||
    isNaN(stock) ||
    !idCategoria ||
    isNaN(idCategoria)
  ) {
    return {
      message: "Todos los campos obligatorios deben ser válidos.",
      status: "error",
    };
  }

  try {
    await prisma.producto.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        imagen,
        precio,
        stock,
        idCategoria,
      },
    });
    revalidatePath("/productos");
    return { message: "Producto actualizado exitosamente.", status: "success" };
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    return { message: "Error al actualizar el producto.", status: "error" };
  }
}

export async function deleteProduct(id: number) {
  try {
    await prisma.producto.delete({
      where: { id },
    });
    revalidatePath("/productos");
    return { message: "Producto eliminado exitosamente.", status: "success" };
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    return { message: "Error al eliminar el producto.", status: "error" };
  }
}
