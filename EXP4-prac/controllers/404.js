exports.get404 = (req,res,next)=>{
  res.status(404).render("404page", { pageTitle: "404 - Not Found" ,currentPage:404});
 }