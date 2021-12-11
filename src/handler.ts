import { substrBetween } from './substrBetween';
import { html } from './html';
import { JSONSchemaForWebApplicationManifestFiles } from './manifest';
import { splitBetween } from './substrBetween';

declare const MY_NS: any;

const headers =  {
  "content-type": "text/html;charset=UTF-8",
  'Access-Control-Allow-Origin': '*',
};

export async function handleRequest(request: Request): Promise<Response> {

  const url = request.url;
  const href = unescape(substrBetween(url, 'href=', '&'));
  if(href === '') {
    return new Response(html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="ts" content="${new Date().toISOString()}">
      <title>PWARP Usage</title>
      <!-- Compiled and minified CSS -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

      <!-- Compiled and minified JavaScript -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    </head>
    <body>
      <h1>pwa-rp Usage</h1>
      <form style="display:flex;flex-direction:column">
        <label for="href">href</label>
        <input type="text" name="href" value="https://www.flipkart.com/manifest.json">

        <!-- <label for="stylesheet">stylesheets</label>
        <input type="text" id="stylesheets" size=100 name="stylesheets" value="https://unpkg.com/open-props,https://unpkg.com/open-props/normalize.min.css">
        <label for="embedded">embedded</label>
        <input type="text" id="embedded" name="embedded" value="false"> -->
        <label for="ua">User-Agent</label>
        <input type="text" name="ua" value="">        
        <label for="ts">Timestamp</label>
        <input type="text" id="ts" name="ts" value="${new Date().toISOString()}">
        <button type="submit">Submit</button>
      </form>
    </body>
  </html>
  `, {headers});
  }
  const ua = unescape(substrBetween(url, 'ua=', '&')) || request.headers.get('user-agent') || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/96.0.4664.55";
  const ts = unescape(substrBetween(url, 'ts=', '&'));

  
  let manifest: JSONSchemaForWebApplicationManifestFiles | undefined;
  if(ts){
    const text = await MY_NS.get(ts);
    if(text){
      console.log('parsing from cache');
      manifest = JSON.parse(text);
    }
  }
  if(manifest === undefined) {
    const response = await fetch(href, {
      headers: {
        "User-Agent": ua,
      }
    });
    const manifestTest = await response.text(); 

    try{
      manifest = JSON.parse(manifestTest);
      if(ts){
        await MY_NS.put(ts, manifestTest);
      }
    }catch(e){
      console.error('Cannot parse:');
      console.error(manifestTest);
      return new Response(html`
      ${manifestTest}
      `, {headers});
    }
  }
  return new Response(html`
  <section itemscope itemtype="https://json.schemastore.org/web-manifest.json">
    <fieldset>
      <legend>Identity</legend>
      <dl>
        <dt>Short Name</dt>
        <dd itemprop="short_name">${manifest!.short_name!}</dd>
        <dt>Name</dt>
        <dd itemprop="name">${manifest!.name!}</dd>
        <dt>Description</dt>
        <dd itemprop="description">${manifest!.description!}</dd>
        <dt>ID</dt>
        <dd itemprop="id">${manifest!.id!}</dd>
      </dl>
    </fieldset>

    <fieldset>
      <legend>Display</legend>
      <label>Theme Color
        <input readonly type="color" name="theme_color" value="${manifest!.theme_color!}" />
      </label>
      
      <label>
        Background Color
        <input readonly type="color" name="background_color" value="${manifest!.background_color!}" />
      </label>
      


      <a href="${manifest!.start_url!}" itemprop="start_url" target=_blank>${manifest!.start_url!}</a>

    </fieldset>


    <table itemprop="icons">
      <caption>Icons</caption>
    <thead>
      <tr>
        <th>Purpose</th>
        <th>Image</th>
        <th>Type</th>
        <th>Sizes</th>
      </tr>
    </thead>
    <tbody>
      ${manifest!.icons ? manifest!.icons.map(icon => html`
        <tr>
          <td itemtype="purpose">${icon.purpose!}</td>
          <td>
            
          </td>
          <td>${icon.type!}</td>
          <td>${icon.sizes!}</td>
        </tr>
      `).join('') : html``}
    </tbody>

  </table>

  <table itemprop="screenshots">
    <caption>Screenshots</caption>
    <thead>
      <tr>
        <th>Purpose</th>
        <th>Image</th>
      </tr>
    </thead>
    <tbody>
      ${manifest!.screenshots ? manifest!.screenshots.map(screenshot => html`
        <tr>
          <td itemtype="purpose">${screenshot.purpose!}</td>
          <td>
            <img src="${screenshot.src}" alt="${screenshot.type!}"  itemprop="src">
          </td>
        </tr>
      `).join('') : html``}
    </tbody>
  </table>

  </section>
  `, {headers});
}

function getFQUrl(url: string, href: string): string {
  if(url.startsWith('/')){
    return url;
  }
  return url;
}
