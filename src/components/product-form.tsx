"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SubmitButton } from "@/components/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct } from "@/actions/products";
import type { Producto, Categoria } from "@prisma/client";

interface ProductFormProps {
  product?: Producto;
  categories: Categoria[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const initialState = { message: "", status: "" };
  const [state, formAction] = useFormState(
    product ? updateProduct : createProduct,
    initialState
  );

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Éxito",
        description: state.message,
        variant: "default",
      });
      router.push("/productos");
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, router, toast]);

  return (
    <form action={formAction} className="grid gap-4">
      {product && <input type="hidden" name="id" value={product.id} />}
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          name="nombre"
          placeholder="Nombre del producto"
          defaultValue={product?.nombre || ""}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción del producto (opcional)"
          defaultValue={product?.descripcion || ""}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="imagen">URL de Imagen</Label>
        <Input
          id="imagen"
          name="imagen"
          placeholder="https://ejemplo.com/imagen.jpg"
          defaultValue={product?.imagen || "/placeholder.svg"}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="precio">Precio</Label>
          <Input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            placeholder="0.00"
            defaultValue={product?.precio || ""}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            placeholder="0"
            defaultValue={product?.stock || ""}
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="idCategoria">Categoría</Label>
        <Select
          name="idCategoria"
          defaultValue={product?.idCategoria.toString()}
          required
        >
          <SelectTrigger id="idCategoria">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <SubmitButton>
        {product ? "Actualizar Producto" : "Crear Producto"}
      </SubmitButton>
    </form>
  );
}
