import { ArtistHeader } from "@/components/artist-header"
import { ArtistTabs } from "@/components/artist-tabs"
import { HomeHeader } from "@/components/home-header"

// Mock artist data - in a real app, this would come from a database
const getArtistData = (artistId: string) => {
  const artists = {
    "taylor-swift": {
      id: "taylor-swift",
      name: "Taylor Swift",
      bio: "Taylor Alison Swift is an American singer-songwriter known for her narrative songwriting, which often centers around her personal life and has received widespread media coverage and critical praise.",
      image: "/prop/taylor.png",
      backgroundImage: "/prop/back.jpg",
      genres: ["Pop"],
      monthlyListeners: "89.2M",
      followers: "45.8M",
      verified: true,
      formed: "2006",
      location: "Nashville, TN",
      website: "https://taylorswift.com",
      socialMedia: {
        instagram: "@taylorswift",
        twitter: "@taylorswift13",
        spotify: "06HL4z0CvFAxyc27GXpf02",
      },
    },
    "the-weeknd": {
      id: "the-weeknd",
      name: "The Weeknd",
      bio: "Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer. He is noted for his unconventional music production, artistic reinvention, and his signature use of the falsetto register.",
      image: "/prop/theweeknd.png",
      backgroundImage: "/prop/back.jpg",
      genres: ["Pop"],
      monthlyListeners: "78.5M",
      followers: "32.1M",
      verified: true,
      formed: "2009",
      location: "Toronto, ON",
      website: "https://theweeknd.com",
      socialMedia: {
        instagram: "@theweeknd",
        twitter: "@theweeknd",
        spotify: "1Xyo4u8uXC1ZmMpatF05PJ",
      },
    },
  }

  return artists[artistId as keyof typeof artists] || artists["taylor-swift"]
}

interface ArtistPageProps {
  params: {
    artistId: string
  }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const artist = getArtistData(params.artistId)

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <ArtistHeader artist={artist} />
        <ArtistTabs artist={artist} />
      </main>
    </div>
  )
}
