export interface GeniusResponseFormat {
  meta: { status: number; message?: string };
  // response format https://docs.genius.com/#/response-format-h1
  response: unknown;
}

export interface ArtistHit {
  highlights?: [];
  index: string;
  result: {
    api_path: string;
    header_image_url: string;
    id: number;
    image_url: string;
    index_character: string;
    iq: number;
    is_meme_verified: boolean;
    is_verified: boolean;
    name: string;
    slug: string;
    url: string;
    _type: string;
  };
  type: string;
}

export interface ArtistSimple {
  name: string;
  slug: string;
  id: number;
}

export interface SongFromApi {
  annotation_count: number;
  api_path: string;
  artist_names: string;
  featured_artists: [];
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  lyrics_owner_id: number;
  lyrics_state: string; // possibly "complete" | "incomplete"
  path: string; // change this to lyric_path
  primary_artist: {
    api_path: string;
    header_image_url: string;
    id: number;
    image_url: string;
    is_meme_verified: boolean;
    is_verified: boolean;
    name: string;
    url: string;
  };
  primary_artists: string[];
  pyongs_count: number;
  relationships_index_url: string;
  release_date_components: { year: number; month: number; day: number };
  release_date_for_display: string;
  release_date_with_abbreviated_month_for_display: string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  stats: {
    unreviewed_annotations: number;
    concurrents: number;
    hot: boolean;
    pageviews: number;
  };
  title: string;
  title_with_featured: string;
  url: string;
}
