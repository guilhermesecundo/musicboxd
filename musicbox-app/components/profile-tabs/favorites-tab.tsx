"use client";

import { useEffect, useState } from "react";
import { Star, Music, Disc } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface User {
  id: number;
  username: string;
  isCurrentUser: boolean;
}

interface FavoritesTabProps {
  user: User;
}

export function FavoritesTab({ user }: FavoritesTabProps) {
  const [favoriteSongs, setFavoriteSongs] = useState<any[]>([]);
  const [favoriteAlbums, setFavoriteAlbums] = useState<any[]>([]);
  const [favoriteArtists, setFavoriteArtists] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [songsRes, albumsRes, artistsRes] = await Promise.all([
        fetch(`/api/users/${user.id}/favorites/songs`).then((res) => res.json()),
        fetch(`/api/users/${user.id}/favorites/albums`).then((res) => res.json()),
        fetch(`/api/users/${user.id}/favorites/artists`).then((res) => res.json()),
      ]);

      setFavoriteSongs(songsRes);
      setFavoriteAlbums(albumsRes);
      setFavoriteArtists(artistsRes);
    };

    fetchData();
  }, [user.id]);

  const handleAlbumClick = (albumTitle: string, artistName: string) => {
    const albumId = `${albumTitle}-${artistName}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    window.location.href = `/album/${albumId}`;
  };

  const handleArtistClick = (artistName: string) => {
    const artistId = artistName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    window.location.href = `/artist/${artistId}`;
  };

  return (
    <Tabs defaultValue="songs" className="w-full">
      <TabsList>
        <TabsTrigger value="songs">Favorite Songs</TabsTrigger>
        <TabsTrigger value="albums">Favorite Albums</TabsTrigger>
        <TabsTrigger value="artists">Favorite Artists</TabsTrigger>
      </TabsList>

      <TabsContent value="songs" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-pink-500" />
              Favorite Songs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {favoriteSongs.map((song) => (
                <div key={song.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate hover:text-primary transition-colors">{song.title}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArtistClick(song.artist);
                      }}
                      className="text-sm text-muted-foreground truncate hover:text-primary transition-colors text-left block"
                    >
                      {song.artist}
                    </button>
                    <p className="text-xs text-muted-foreground">
                      {song.album} • {song.year} • {song.duration}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: song.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="albums" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Disc className="h-5 w-5 text-purple-500" />
              Favorite Albums
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteAlbums.map((album) => (
                <div
                  key={album.id}
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleAlbumClick(album.title, album.artist)}
                >

                  <div className="space-y-2">
                    <h3 className="font-medium truncate hover:text-primary transition-colors">{album.title}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArtistClick(album.artist);
                      }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors text-left block"
                    >
                      {album.artist}
                    </button>
                    <p className="text-xs text-muted-foreground">
                      {album.year} • {album.tracks} tracks
                    </p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: album.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="artists" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Favorite Artists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteArtists.map((artist) => (
                <div key={artist.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{artist.name}</h3>
                      <p className="text-sm text-muted-foreground">{artist.genre}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{artist.albums} albums in library</p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleArtistClick(artist.name)}>
                    View Artist
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
