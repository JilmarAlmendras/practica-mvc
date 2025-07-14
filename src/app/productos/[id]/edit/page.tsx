import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductForm } from "@/components/product-form";
import { getProductById } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const id = Number.parseInt(params.id);
  const { product, error: productError } = await getProductById(id);
  const { categories, error: categoriesError } = await getCategories();

  if (productError) {
    return (
      <div className="text-red-500">
        Error al cargar el producto: {productError}
      </div>
    );
  }
  if (categoriesError) {
    return (
      <div className="text-red-500">
        Error al cargar categorías: {categoriesError}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-muted-foreground">
        Producto no encontrado.
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Editar Producto</CardTitle>
          <CardDescription>
            No se pueden editar productos sin categorías disponibles.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center text-muted-foreground">
            Por favor, crea una nueva categoría primero.
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
        <CardTitle>Editar Producto</CardTitle>
        <CardDescription>Actualiza los detalles del producto.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm product={product} categories={categories} />
      </CardContent>
    </Card>
  );
}
