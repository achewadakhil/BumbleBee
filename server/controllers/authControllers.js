
export function UserSignUp(req,res){
    console.log(req.body);
    return res.json({
        params : req.body
    });
}