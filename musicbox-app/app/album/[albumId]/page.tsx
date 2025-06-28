import { AlbumHeader } from "@/components/album-header"
import { AlbumTracks } from "@/components/album-tracks"
import { HomeHeader } from "@/components/home-header"
import prisma from "@/lib/prisma"

interface AlbumPageProps {
  params: {
    albumId: string
  }
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const albumIdNum = parseInt(params.albumId)

  const album = await prisma.albums.findUnique({
    where: { id: albumIdNum },
    include: {
      artists: true,
      musics: true,
    },
  })

  if (!album) {
    return <div>Album not found</div>
  }

  const albumData = {
    id: album.id,
    title: album.title,
    artista: {
      id: album.artists.id,
      name: album.artists.name,
    },
    ano: album.release_date.toISOString(),
    capa: "/placeholder.svg",
    duracao: album.musics.reduce((total, m) => total + m.duration, 0),
    musicas: album.musics,
  }

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <AlbumHeader album={albumData} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <AlbumTracks album={albumData} />
          </div>
        </div>
      </main>
    </div>
  )
}
