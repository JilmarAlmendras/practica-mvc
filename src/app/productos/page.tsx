import Link from "next/link";
import Image from "next/image";
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
import { getProducts, deleteProduct } from "@/actions/products";
import { Pencil } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"; // Importar el nuevo componente

export default async function ProductsPage() {
  const { products, error } = await getProducts();

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded-md bg-red-50 max-w-2xl mx-auto">
        <h2 className="font-bold text-lg mb-2">
          Error al cargar los productos:
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
          También revisa tu archivo <code className="font-mono">.env</code> en
          la raíz de tu proyecto para la variable{" "}
          <code className="font-mono">DATABASE_URL</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Button asChild>
          <Link href="/productos/new">Nuevo Producto</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
          <CardDescription>Gestiona tus productos.</CardDescription>
        </CardHeader>
        <CardContent>
          {products && products.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No hay productos registrados. ¡Crea uno nuevo!
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Imagen</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.imagen || "/placeholder.svg"}
                        width={64}
                        height={64}
                        alt={product.nombre}
                        className="aspect-square rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.nombre}
                    </TableCell>
                    <TableCell>{product.categoria.nombre}</TableCell>
                    <TableCell>${product.precio.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/productos/${product.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Link>
                        </Button>
                        {/* Usar el nuevo componente de confirmación */}
                        <DeleteConfirmationDialog
                          id={product.id}
                          name={product.nombre}
                          deleteAction={deleteProduct}
                        />
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
