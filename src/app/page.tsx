import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, ShoppingCart, Database } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
          <Database className="h-10 w-10" />
          Sistema de Gestión MVC
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Aplicación construida con Next.js, Prisma, shadcn/ui y TypeScript
          siguiendo el patrón Modelo-Vista-Controlador
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              Categorías
            </CardTitle>
            <CardDescription>
              Visualiza y gestiona todas las categorías de productos.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Link href="/categorias" className="flex-1">
              <Button className="w-full">Ver Categorías</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              Productos
            </CardTitle>
            <CardDescription>
              Explora el catálogo completo de productos disponibles.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Link href="/productos" className="flex-1">
              <Button className="w-full">Ver Productos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Arquitectura MVC</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Modelo</h3>
            <p className="text-sm text-muted-foreground">
              Prisma ORM con SQLite para la gestión de datos
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">Vista</h3>
            <p className="text-sm text-muted-foreground">
              Componentes React con shadcn/ui para la interfaz
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Package className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Controlador</h3>
            <p className="text-sm text-muted-foreground">
              Server Actions de Next.js para la lógica de negocio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
