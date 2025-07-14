"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// Define el tipo para el estado que devuelven las acciones del formulario (crear/actualizar)
type FormState = {
  message: string;
  status: "success" | "error" | "";
};

// Define el tipo para el retorno de las acciones de eliminación
type DeleteActionReturn = {
  message: string;
  status: "success" | "error";
};

export async function getCategories() {
  try {
    const categories = await prisma.categoria.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    return { categories, error: null };
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return {
      categories: null,
      error: `Error de base de datos al obtener categorías: ${error.message}`,
    };
  }
}

export async function getCategoryById(id: number) {
  try {
    const category = await prisma.categoria.findUnique({
      where: { id },
    });
    return { category, error: null };
  } catch (error: any) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return {
      category: null,
      error: `Error de base de datos al obtener categoría ${id}: ${error.message}`,
    };
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
  } catch (error: any) {
    console.error("Error creating category:", error);
    return {
      message: `Error al crear la categoría: ${error.message || error}`,
      status: "error",
    };
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
  } catch (error: any) {
    console.error(`Error updating category with ID ${id}:`, error);
    return {
      message: `Error al actualizar la categoría: ${error.message || error}`,
      status: "error",
    };
  }
}

export async function deleteCategory(id: number): Promise<DeleteActionReturn> {
  // <-- ¡Aquí el cambio!
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
  } catch (error: any) {
    console.error(`Error deleting category with ID ${id}:`, error);
    return {
      message: `Error al eliminar la categoría: ${error.message || error}`,
      status: "error",
    };
  }
}
