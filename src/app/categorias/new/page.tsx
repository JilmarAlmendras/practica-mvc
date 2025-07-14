import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "@/components/category-form";

export default function NewCategoryPage() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crear Nueva Categoría</CardTitle>
        <CardDescription>
          Ingresa los detalles de la nueva categoría.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CategoryForm />
      </CardContent>
    </Card>
  );
}
