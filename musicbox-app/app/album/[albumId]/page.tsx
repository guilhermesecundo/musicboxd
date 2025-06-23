import { AlbumHeader } from "@/components/album-header"
import { AlbumTracks } from "@/components/album-tracks"
import { AlbumReviews } from "@/components/album-reviews"
import { AlbumRecommendations } from "@/components/album-recommendations"
import { HomeHeader } from "@/components/home-header"

// Mock album data - in a real app, this would come from a database
const getAlbumData = (albumId: string) => {
  const albums = {
    midnights: {
      id: "midnights",
      title: "Midnights",
      artist: "Taylor Swift",
      artistId: "taylor-swift",
      releaseDate: "2022-10-21",
      cover: "/placeholder.svg?height=400&width=400",
      backgroundImage: "/placeholder.svg?height=600&width=1200",
      genres: ["Pop", "Synth-pop", "Electropop"],
      duration: "44:08",
      trackCount: 13,
      label: "Republic Records",
      producer: "Jack Antonoff, Taylor Swift",
      description:
        "Taylor Swift's tenth studio album, exploring themes of sleepless nights and self-reflection. A sonic return to the synth-pop sound with introspective lyrics.",
      rating: 4.8,
      reviewCount: 2847,
      plays: "5.2B",
      likes: "892K",
      tracks: [
        {
          id: 1,
          title: "Lavender Haze",
          duration: "3:22",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          explicit: false,
          plays: "892M",
        },
        {
          id: 2,
          title: "Maroon",
          duration: "3:38",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          explicit: false,
          plays: "654M",
        },
        {
          id: 3,
          title: "Anti-Hero",
          duration: "3:20",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          explicit: false,
          plays: "1.2B",
        },
        {
          id: 4,
          title: "Snow On The Beach",
          duration: "4:16",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          explicit: false,
          plays: "445M",
        },
        {
          id: 5,
          title: "You're On Your Own, Kid",
          duration: "3:14",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          explicit: false,
          plays: "387M",
        },
      ],
    },
    "red-taylors-version": {
      id: "red-taylors-version",
      title: "Red (Taylor's Version)",
      artist: "Taylor Swift",
      artistId: "taylor-swift",
      releaseDate: "2021-11-12",
      cover: "/placeholder.svg?height=400&width=400",
      backgroundImage: "/placeholder.svg?height=600&width=1200",
      genres: ["Pop", "Country Pop", "Rock"],
      duration: "130:21",
      trackCount: 30,
      label: "Republic Records",
      producer: "Taylor Swift, Jack Antonoff, Aaron Dessner",
      description:
        "The re-recorded version of Red, featuring the iconic 10-minute version of All Too Well and vault tracks.",
      rating: 4.9,
      reviewCount: 3521,
      plays: "3.8B",
      likes: "1.2M",
      tracks: [
        {
          id: 1,
          title: "State Of Grace (Taylor's Version)",
          duration: "4:55",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          explicit: false,
          plays: "234M",
        },
        {
          id: 2,
          title: "Red (Taylor's Version)",
          duration: "3:43",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          explicit: false,
          plays: "445M",
        },
        {
          id: 3,
          title: "All Too Well (10 Minute Version)",
          duration: "10:13",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
          explicit: false,
          plays: "892M",
        },
      ],
    },
    folklore: {
      id: "folklore",
      title: "folklore",
      artist: "Taylor Swift",
      artistId: "taylor-swift",
      releaseDate: "2020-07-24",
      cover: "/placeholder.svg?height=400&width=400",
      backgroundImage: "/placeholder.svg?height=600&width=1200",
      genres: ["Indie Folk", "Alternative Rock", "Chamber Pop"],
      duration: "63:29",
      trackCount: 16,
      label: "Republic Records",
      producer: "Aaron Dessner, Jack Antonoff, Taylor Swift",
      description:
        "An introspective indie folk album created during the COVID-19 pandemic, showcasing Swift's storytelling abilities.",
      rating: 4.7,
      reviewCount: 2156,
      plays: "4.1B",
      likes: "967K",
      tracks: [
        {
          id: 1,
          title: "the 1",
          duration: "3:30",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
          explicit: false,
          plays: "445M",
        },
        {
          id: 2,
          title: "cardigan",
          duration: "3:59",
          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
          explicit: false,
          plays: "678M",
        },
      ],
    },
  }

  return albums[albumId as keyof typeof albums] || albums["midnights"]
}

interface AlbumPageProps {
  params: {
    albumId: string
  }
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const album = getAlbumData(params.albumId)

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <AlbumHeader album={album} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <AlbumTracks album={album} />
          </div>
          <div className="space-y-6">
            <AlbumReviews album={album} />
            <AlbumRecommendations album={album} />
          </div>
        </div>
      </main>
    </div>
  )
}
