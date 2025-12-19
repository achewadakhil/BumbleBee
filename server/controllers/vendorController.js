export function postAd(req,res){
    const {token} = req.headers;
    console.log(`token : ${token}`);
    res.json({
        token
    });
}