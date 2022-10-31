export default function(ctx) {
  if(ctx.route.fullPath == '/carbon') {
    ctx.redirect(301, '/tracker')
  }

  if(ctx.route.fullPath == '/lending') {
    ctx.redirect(301, '/calendar')
  }
  
  if(ctx.route.fullPath == '/collections/Hive') {
    ctx.redirect(301, '/collections/butterfly')
  }

  if(ctx.route.fullPath == '/collections/NFTBee') {
    ctx.redirect(301, '/collections/hive')
  }
}