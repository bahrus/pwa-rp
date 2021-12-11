/**
 * Generated via https://transform.tools/json-schema-to-typescript
 * combined with https://json.schemastore.org/web-manifest-combined.json
 */
 export type JSONSchemaForWebApplicationManifestFiles = JSONSchemaForWebApplicationManifestFiles1 &
 JSONSchemaForWebApplicationManifestFilesWithAppInformationExtensions

export interface JSONSchemaForWebApplicationManifestFiles1 {
 /**
  * The background_color member describes the expected background color of the web application.
  */
 background_color?: string
 /**
  * The base direction of the manifest.
  */
 dir?: "ltr" | "rtl" | "auto"
 /**
  * The item represents the developer's preferred display mode for the web application.
  */
 display?: "fullscreen" | "standalone" | "minimal-ui" | "browser"
 /**
  * The icons member is an array of icon objects that can serve as iconic representations of the web application in various contexts.
  */
 icons?: {
   /**
    * The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media.
    */
   sizes?: string | "any"
   /**
    * The src member of an image is a URL from which a user agent can fetch the icon's data.
    */
   src: string
   /**
    * The type member of an image is a hint as to the media type of the image.
    */
   type?: string
   purpose?:
     | "monochrome"
     | "maskable"
     | "any"
     | "monochrome maskable"
     | "monochrome any"
     | "maskable monochrome"
     | "maskable any"
     | "any monochrome"
     | "any maskable"
     | "monochrome maskable any"
     | "monochrome any maskable"
     | "maskable monochrome any"
     | "maskable any monochrome"
     | "any monochrome maskable"
     | "any maskable monochrome"
   [k: string]: unknown
 }[]
 /**
  * The primary language for the values of the manifest.
  */
 lang?: string
 /**
  * The name of the web application.
  */
 name?: string
 /**
  * The orientation member is a string that serves as the default orientation for all  top-level browsing contexts of the web application.
  */
 orientation?:
   | "any"
   | "natural"
   | "landscape"
   | "portrait"
   | "portrait-primary"
   | "portrait-secondary"
   | "landscape-primary"
   | "landscape-secondary"
 /**
  * Boolean value that is used as a hint for the user agent to say that related applications should be preferred over the web application.
  */
 prefer_related_applications?: boolean
 /**
  * Array of application accessible to the underlying application platform that has a relationship with the web application.
  */
 related_applications?: {
   /**
    * The platform it is associated to.
    */
   platform: "chrome_web_store" | "play" | "itunes" | "windows"
   /**
    * The URL where the application can be found.
    */
   url?: string
   /**
    * Information additional to the URL or instead of the URL, depending on the platform.
    */
   id?: string
   /**
    * Information about the minimum version of an application related to this web app.
    */
   min_version?: string
   /**
    * An array of fingerprint objects used for verifying the application.
    */
   fingerprints?: {
     type?: string
     value?: string
     [k: string]: unknown
   }[]
   [k: string]: unknown
 }[]
 /**
  * A string that represents the navigation scope of this web application's application context.
  */
 scope?: string
 /**
  * A string that represents a short version of the name of the web application.
  */
 short_name?: string
 /**
  * Array of shortcut items that provide access to key tasks within a web application.
  */
 shortcuts?: {
   /**
    * The name member of a shortcut item is a string that represents the name of the shortcut as it is usually displayed to the user in a context menu.
    */
   name: string
   /**
    * The short_name member of a shortcut item is a string that represents a short version of the name of the shortcut. It is intended to be used where there is insufficient space to display the full name of the shortcut.
    */
   short_name?: string
   /**
    * The description member of a shortcut item is a string that allows the developer to describe the purpose of the shortcut.
    */
   description?: string
   /**
    * The url member of a shortcut item is a URL within scope of a processed manifest that opens when the associated shortcut is activated.
    */
   url: string
   /**
    * The icons member of a shortcut item serves as iconic representations of the shortcut in various contexts.
    */
   icons?: {
     /**
      * The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media.
      */
     sizes?: string | "any"
     /**
      * The src member of an image is a URL from which a user agent can fetch the icon's data.
      */
     src: string
     /**
      * The type member of an image is a hint as to the media type of the image.
      */
     type?: string
     purpose?:
       | "monochrome"
       | "maskable"
       | "any"
       | "monochrome maskable"
       | "monochrome any"
       | "maskable monochrome"
       | "maskable any"
       | "any monochrome"
       | "any maskable"
       | "monochrome maskable any"
       | "monochrome any maskable"
       | "maskable monochrome any"
       | "maskable any monochrome"
       | "any monochrome maskable"
       | "any maskable monochrome"
     [k: string]: unknown
   }[]
   [k: string]: unknown
 }[]
 /**
  * Represents the URL that the developer would prefer the user agent load when the user launches the web application.
  */
 start_url?: string
 /**
  * The theme_color member serves as the default theme color for an application context.
  */
 theme_color?: string
 /**
  * A string that represents the id of the web application.
  */
 id?: string
 [k: string]: unknown
}
export interface JSONSchemaForWebApplicationManifestFilesWithAppInformationExtensions {
 /**
  * Describes the expected application categories to which the web application belongs.
  */
 categories?: string[]
 /**
  * Description of the purpose of the web application
  */
 description?: string
 /**
  * Represents an ID value of the IARC rating of the web application. It is intended to be used to determine which ages the web application is appropriate for.
  */
 iarc_rating_id?: string
 /**
  * The screenshots member is an array of image objects represent the web application in common usage scenarios.
  */
 screenshots?: {
   /**
    * The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media.
    */
   sizes?: string | "any"
   /**
    * The src member of an image is a URL from which a user agent can fetch the icon's data.
    */
   src: string
   /**
    * The type member of an image is a hint as to the media type of the image.
    */
   type?: string
   purpose?:
     | "monochrome"
     | "maskable"
     | "any"
     | "monochrome maskable"
     | "monochrome any"
     | "maskable monochrome"
     | "maskable any"
     | "any monochrome"
     | "any maskable"
     | "monochrome maskable any"
     | "monochrome any maskable"
     | "maskable monochrome any"
     | "maskable any monochrome"
     | "any monochrome maskable"
     | "any maskable monochrome"
   [k: string]: unknown
 }[]
 [k: string]: unknown
}
