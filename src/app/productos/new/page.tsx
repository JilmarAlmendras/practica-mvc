import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductForm } from "@/components/product-form";
import { getCategories } from "@/actions/categories";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NewProductPage() {
  const { categories, error } = await getCategories();

  if (error) {
    return (
      <div className="text-red-500">Error al cargar categorías: {error}</div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Crear Nuevo Producto</CardTitle>
          <CardDescription>
            Para crear un producto, primero debes crear al menos una categoría.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center text-muted-foreground">
            No hay categorías disponibles. Por favor, crea una nueva categoría
            primero.
          </p>
          <Button asChild>
            <Link href="/categorias/new">Crear Nueva Categoría</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crear Nuevo Producto</CardTitle>
        <CardDescription>
          Ingresa los detalles del nuevo producto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm categories={categories} />
      </CardContent>
    </Card>
  );
}
