"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// Define el tipo para el estado que devuelven las acciones del formulario
type FormState = {
  message: string;
  status: "success" | "error" | "";
};

export async function getCategories() {
  try {
    const categories = await prisma.categoria.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    return { categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories." };
  }
}

export async function getCategoryById(id: number) {
  try {
    const category = await prisma.categoria.findUnique({
      where: { id },
    });
    return { category };
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return { error: "Failed to fetch category." };
  }
}

export async function createCategory(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const nombre = formData.get("nombre") as string;
  const descripcion = formData.get("descripcion") as string;

  if (!nombre) {
    return {
      message: "El nombre de la categoría es requerido.",
      status: "error",
    };
  }

  try {
    await prisma.categoria.create({
      data: {
        nombre,
        descripcion,
      },
    });
    revalidatePath("/categorias");
    return { message: "Categoría creada exitosamente.", status: "success" };
  } catch (error) {
    console.error("Error creating category:", error);
    return { message: "Error al crear la categoría.", status: "error" };
  }
}

export async function updateCategory(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = Number.parseInt(formData.get("id") as string);
  const nombre = formData.get("nombre") as string;
  const descripcion = formData.get("descripcion") as string;

  if (!id || !nombre) {
    return {
      message: "ID y nombre de la categoría son requeridos.",
      status: "error",
    };
  }

  try {
    await prisma.categoria.update({
      where: { id },
      data: {
        nombre,
        descripcion,
      },
    });
    revalidatePath("/categorias");
    return {
      message: "Categoría actualizada exitosamente.",
      status: "success",
    };
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    return { message: "Error al actualizar la categoría.", status: "error" };
  }
}

export async function deleteCategory(id: number) {
  try {
    // Check if there are products associated with this category
    const productsCount = await prisma.producto.count({
      where: { idCategoria: id },
    });

    if (productsCount > 0) {
      return {
        message:
          "No se puede eliminar la categoría porque tiene productos asociados.",
        status: "error",
      };
    }

    await prisma.categoria.delete({
      where: { id },
    });
    revalidatePath("/categorias");
    return { message: "Categoría eliminada exitosamente.", status: "success" };
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    return { message: "Error al eliminar la categoría.", status: "error" };
  }
}
