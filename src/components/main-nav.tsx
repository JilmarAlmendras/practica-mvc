import Link from "next/link";
import { Package2 } from "lucide-react";
import { ModeToggle } from "./toogle-theme-button";

export function MainNav() {
  return (
    <div className="flex items-center pt-4 pb-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="sr-only">CRUD App</span>
      </Link>
      <h1 className="font-bold text-2xl pl-2">Practica MVC</h1>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {/* <Link
          href="/productos"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Productos
        </Link>
        <Link
          href="/categorias"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Categorías
        </Link> */}

        <ModeToggle />
      </nav>
    </div>
  );
}
