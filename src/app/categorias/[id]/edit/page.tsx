import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "@/components/category-form";
import { getCategoryById } from "@/actions/categories";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const id = Number.parseInt(params.id);
  const { category, error } = await getCategoryById(id);

  if (error) {
    return (
      <div className="text-red-500">Error al cargar la categoría: {error}</div>
    );
  }

  if (!category) {
    return (
      <div className="text-center text-muted-foreground">
        Categoría no encontrada.
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Editar Categoría</CardTitle>
        <CardDescription>
          Actualiza los detalles de la categoría.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CategoryForm category={category} />
      </CardContent>
    </Card>
  );
}
