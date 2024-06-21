export interface GeniusResponseFormat {
  meta: { status: number; message?: string };
  // response format https://docs.genius.com/#/response-format-h1
  response: unknown;
}

export interface Hit {
  highlights: [];
  index: string;
  result: {
    api_path: string;
    header_image_url: string;
    id: number;
    image_url: string;
    index_character: string;
    iq: number;
    is_meme_verified: true;
    is_verified: true;
    name: string;
    slug: string;
    url: string;
    _type: string;
  };
  type: string;
}
