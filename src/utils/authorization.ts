export default async (req, res, next)=>{
    const role = req.user.role
    if(!role){
        return res.status(403).send({"success": false, "error": { "status code": 403, 'message': "you are not authorized for operation" } })
    }
    next()
}