import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { BadgeCheck, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
const Community = () => {
  return (
    <section className="bg-gradient-to-r from-codeSecondary/80 to-codePrimary/80 px-4 py-24 ">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
                <Badge className="bg-white text-codePrimary hover:bg-background/85 border-none px-3 py-1">Comunidad</Badge>
                <h2 className="text-4xl font-bold text-white tracking-tighter mt-4">Únete a una comunidad de desarrolladores apasionados</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                   <Image src="https://th.bing.com/th/id/R.e1a3a22b0168787b7078b4093c514afe?rik=55hOchBhJ5JnPA&pid=ImgRaw&r=0" 
                  alt="Community"
                  width={500}
                  height={500}
                  className="object-cover rounded-2xl shadow-lg" />
                </div>
                <div className="space-y-6 text-white">
                <p className="text-lg leading-relaxed max-w-lg">
                  CodeJourney es más que una plataforma, es una comunidad donde los desarrolladores pueden compartir, aprender y crecer juntos. Desde principiantes hasta expertos, todos tienen un lugar aquí.
                </p>
                <div className="space-y-3">
                    <p className="flex items-center gap-3">
                      <BadgeCheck  size={20}/>Feedback de desarrolladores experimentados
                    </p>
                    <p className="flex items-center gap-3">
                      <BadgeCheck  size={20}/>Oportunidades de networking y colaboración
                    </p>
                    <p className="flex items-center gap-3">
                      <BadgeCheck  size={20}/>Discusiones sobre las últimas tecnologías
                    </p>
                </div> 
                <div className="mt-2">
                <Link href="/register"> <Button className="bg-white text-codePrimary hover:bg-gray-100 transition-all duration-200 rounded-full px-6 py-3 flex items-center gap-2 font-semibold">Únete ahora <ArrowRight size={20} /></Button></Link>
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Community 