export default function(ctx) {
  if(ctx.route.fullPath == '/carbon') {
    ctx.redirect(301, '/tracker')
  }

  if(ctx.route.fullPath == '/lending') {
    ctx.redirect(301, '/calendar')
  }
}