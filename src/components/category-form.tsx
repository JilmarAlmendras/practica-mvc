"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SubmitButton } from "@/components/submit-button";
import { createCategory, updateCategory } from "@/actions/categories";
import type { Categoria } from "@prisma/client";

interface CategoryFormProps {
  category?: Categoria;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const initialState = { message: "", status: "" };
  const [state, formAction] = useFormState(
    category ? updateCategory : createCategory,
    initialState
  );

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Éxito",
        description: state.message,
        variant: "default",
      });
      router.push("/categorias");
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
      {category && <input type="hidden" name="id" value={category.id} />}
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          name="nombre"
          placeholder="Nombre de la categoría"
          defaultValue={category?.nombre || ""}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción de la categoría (opcional)"
          defaultValue={category?.descripcion || ""}
        />
      </div>
      <SubmitButton>
        {category ? "Actualizar Categoría" : "Crear Categoría"}
      </SubmitButton>
    </form>
  );
}
