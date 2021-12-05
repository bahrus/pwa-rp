import { substrBetween } from './substrBetween';
import { html } from './html';
import { Manifest } from './manifest';
import { splitBetween } from './substrBetween';


const headers =  {
  "content-type": "text/html;charset=UTF-8",
  'Access-Control-Allow-Origin': '*',
};

export async function handleRequest(request: Request): Promise<Response> {

  const mobile = request.headers.get('Sec-ch-ua-mobile') === '?1';
  const url = request.url;
  const hrefs = unescape(substrBetween(url, 'hrefs=', '&'));
  if(hrefs === '') {
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
      <h1>WC Info Usage</h1>
      <form style="display:flex;flex-direction:column">
        <label for="href">href</label>
        <input type="text" id="hrefs" size=100 name="hrefs" value="https://www.flipkart.com/">
        <label for="stylesheet">stylesheet</label>
        <label for="embedded">embedded</label>
        <input type="text" id="embedded" name="embedded" value="false">
        <input type="text" id="stylesheets" size=100 name="stylesheets" value="https://unpkg.com/open-props,https://unpkg.com/open-props/normalize.min.css">
        <label for="ts">Timestamp</label>
        <input type="text" id="ts" name="ts" value="${new Date().toISOString()}">
        <button type="submit">Submit</button>
      </form>
    </body>
  </html>
  `, {headers});
  }
  const embedded = unescape(substrBetween(url, 'embedded=', '&'));
  if(embedded !== 'true') {
    const stylesheets = unescape(substrBetween(url, 'stylesheets=', '&')).split(',');
    return new Response(html`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="ts" content="${new Date().toISOString()}">
        <title>PWARP</title>
        <!-- Compiled and minified CSS -->
        ${stylesheets.map(stylesheet => `<link rel="stylesheet" href="${stylesheet}">`).join('\n')}
        <style>
          .card {
            border-radius: var(--radius-2);
            padding: var(--size-fluid-3);
            box-shadow: var(--shadow-2);

            &:hover {
              box-shadow: var(--shadow-3);
            }

            @media (--motionOK) {
              animation: var(--animation-fade-in);
            }
          }
        </style>
      </head>
      <body>
        ${hrefs.split(',').map(href => html`
        <div class="card">
          <a href="${href}">
            ${href}
            <k-fetch href="?embedded=true&hrefs=${href}" as="html"></k-fetch>
          </a>
        </div>
       `).join('\n')}
        
        <script type="module">
          import('https://cdn.jsdelivr.net/npm/k-fetch@0.0.6/k-fetch.min.js');
        </script>
      </body>
  </html>
    `, {headers});
  }
  const response = await fetch(hrefs, {
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/96.0.4664.55"
    }
  });
  const homepage = await response.text();
  const head = substrBetween(homepage, '<head', '</head>');
  const manifestTagFragment = substrBetween(homepage, 'manifest', '>');
  return new Response(`
    <template>
      <header${head}</header>
    </template>
  `, {headers});
}
