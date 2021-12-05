export interface Manifest {
  "name": string,
  "short_name": string,
  "start_url": string,
  "display": "standalone" | "fullscreen" | "minimal-ui" | "browser",
  "background_color": string,
  "description": string,
  "icons": [{
    "src": string,
    "sizes": string,
    "type": string
  }],
  "related_applications": [{
    "platform": string,
    "url": string
  }]
}