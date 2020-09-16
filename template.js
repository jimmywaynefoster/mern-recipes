export default ({ markup, css }) => {
  return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          >
          <title>MERN Skeleton</title>
          <link href="https://fonts.googleapis.com/css2?family=Lekton:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <style>
              a{
                text-decoration: none;
                color: #061d95
              }
          </style>
        </head>
        <body style="margin:0">
          <div id="root">${markup}</div>
          <style id="jss-server-side">${css}</style>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`;
};
