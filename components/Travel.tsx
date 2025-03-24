import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

const Travel = () => {
  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black/95 px-6 py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-6 mb-12">
          <Badge className="bg-codePrimary/20 text-codePrimary hover:bg-codePrimary/30 border-none">
            ¿Listo para empezar?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white glow-text">
            Comienza tu viaje en CodeJourney hoy mismo
          </h2>
          <p className="text-white/80 text-lg">
            Únete a miles de desarrolladores que ya están compartiendo conocimientos, resolviendo problemas y creciendo profesionalmente en nuestra plataforma.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register">
            <Button className="w-full sm:w-auto bg-white text-codePrimary hover:bg-gray-100 border-none rounded-full text-center">
              Crear cuenta gratis
            </Button>
          </Link>
          <Link href="/posts">
            <Button className="w-full sm:w-auto bg-codePrimary text-white hover:bg-gray-800 hover:text-white border-none rounded-full text-center">
              Explorar primero
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Travel;
