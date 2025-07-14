import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories, deleteCategory } from "@/actions/categories";
import { Trash2, Pencil } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function CategoriesPage() {
  const { categories, error } = await getCategories();

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded-md bg-red-50 max-w-2xl mx-auto">
        <h2 className="font-bold text-lg mb-2">
          Error al cargar las categorías:
        </h2>
        <p>{error}</p>
        <p className="mt-4 text-sm text-gray-700">
          Por favor, asegúrate de que tu base de datos está configurada
          correctamente.
          <br />
          Verifica que has ejecutado los siguientes comandos en tu terminal:
          <br />
          <code className="block bg-gray-100 p-2 rounded mt-2">
            npx prisma migrate dev --name init
          </code>
          <br />
          También revisa tu archivo <code className="font-mono">.env</code> para
          la variable <code className="font-mono">DATABASE_URL</code>.
        </p>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    "use server";
    const { message, status } = await deleteCategory(id);
    revalidatePath("/categorias");
    console.log(`Delete status: ${status}, message: ${message}`);
    // En una aplicación real, aquí podrías usar un toast del lado del cliente
    // para mostrar el mensaje de éxito/error de la eliminación.
  };

  return (
    <div className="grid gap-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button asChild>
          <Link href="/categorias/new">Nueva Categoría</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Categorías</CardTitle>
          <CardDescription>
            Gestiona tus categorías de productos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categories && categories.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No hay categorías registradas. ¡Crea una nueva!
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.nombre}
                    </TableCell>
                    <TableCell>{category.descripcion || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/categorias/${category.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Link>
                        </Button>
                        <form action={handleDelete.bind(null, category.id)}>
                          <Button
                            variant="destructive"
                            size="icon"
                            type="submit"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
